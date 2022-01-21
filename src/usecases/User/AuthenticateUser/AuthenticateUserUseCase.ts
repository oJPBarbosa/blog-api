import 'dotenv/config';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IMailProvider } from '../../../providers/IMailProvider';
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { ExecuteError } from '../../../errors/ExecuteError';
import { User } from '../../../entities/User';
import { compare } from 'bcrypt';
import speakeasy from 'speakeasy';

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: IAuthenticateUserRequestDTO): Promise<string> {
    try {
      analyzeDTO(data);
    } catch (err) {
      throw new ExecuteError({
        message: err.message,
        status: 400,
      });
    }

    const { email, password } = data;

    const user: User = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ExecuteError({
        message: 'User not found.',
        status: 404,
      });
    }

    if (!user.verified || !user.authorized) {
      throw new ExecuteError({
        message: `User is not ${user.verified ? 'authorized' : 'verified'}.`,
        status: 401,
      });
    }

    const passwordMatches: boolean = await compare(password, user.password);

    if (!passwordMatches) {
      throw new ExecuteError({
        message: 'Invalid password.',
        status: 401,
      });
    }

    try {
      await this.mailProvider.sendMail({
        to: {
          email: user.email,
          name: user.name,
        },
        from: {
          email: process.env.NOREPLY_EMAIL_ADDRESS,
          name: process.env.NOREPLY_EMAIL_NAME,
        },
        subject: process.env.USER_2FA_EMAIL_SUBJECT,
        body: process.env.USER_2FA_EMAIL_BODY.replace(
          '{name}',
          user.name,
        ).replace(
          '{token}',
          speakeasy.totp({ secret: user.secret, encoding: 'base32' }),
        ),
      });
    } catch (err) {
      throw new ExecuteError({
        message: 'Unexpected error ocurred while sending email.',
        status: 500,
      });
    }

    return user.user_id;
  }
}
