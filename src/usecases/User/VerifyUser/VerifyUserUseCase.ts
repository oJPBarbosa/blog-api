import 'dotenv/config';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IMailProvider } from '../../../providers/IMailProvider';
import { IVerifyUserRequestDTO } from './VerifyUserDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { ExecuteError } from '../../../errors/ExecuteError';
import { JwtPayload, verify } from 'jsonwebtoken';
import { USER_VERIFICATION_SECRET } from '../../../utils/secrets';
import { User } from '../../../entities/User';
import speakeasy from 'speakeasy';

export class VerifyUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: IVerifyUserRequestDTO): Promise<void> {
    try {
      analyzeDTO(data);
    } catch (err) {
      throw new ExecuteError({
        message: err.message,
        status: 400,
      });
    }

    const { token } = data;

    let payload: string | JwtPayload;

    try {
      payload = verify(token, USER_VERIFICATION_SECRET);
    } catch (err) {
      throw new ExecuteError({
        message: 'Invalid token.',
        status: 401,
      });
    }

    if (typeof payload === 'string') {
      throw new ExecuteError({
        message: 'Invalid token.',
        status: 401,
      });
    }

    const { id } = payload;

    const user: User = await this.usersRepository.findById(id);

    if (!user) {
      throw new ExecuteError({
        message: 'User not found.',
        status: 404,
      });
    }

    if (user.verified) {
      throw new ExecuteError({
        message: 'User already verified.',
        status: 409,
      });
    }

    user.verified = true;
    user.secret = speakeasy.generateSecret().base32;

    await this.usersRepository.save(user);

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
        subject: process.env.USER_VERIFIED_EMAIL_SUBJECT.replace(
          '{name}',
          user.name.split(' ')[0],
        ),
        body: process.env.USER_VERIFIED_EMAIL_BODY.replace('{name}', user.name),
      });

      await this.mailProvider.sendMail({
        to: {
          email: process.env.ROOT_EMAIL_ADDRESS,
          name: process.env.ROOT_EMAIL_NAME,
        },
        from: {
          email: process.env.NOREPLY_EMAIL_ADDRESS,
          name: process.env.NOREPLY_EMAIL_NAME,
        },
        subject: process.env.WRITER_AUTHORIZATION_REQUEST_EMAIL_SUBJECT.replace(
          '{name}',
          user.name.split(' ')[0],
        ),
        body: process.env.WRITER_AUTHORIZATION_REQUEST_EMAIL_BODY.replace(
          '{user.email}',
          user.email,
        )
          .replace('{user.name}', user.name)
          .replace('{request.date}', new Date().toISOString()),
      });
    } catch (err) {
      throw new ExecuteError({
        message: 'Unexpected error ocurred while sending email.',
        status: 500,
      });
    }
  }
}
