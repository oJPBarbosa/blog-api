import 'dotenv/config';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IMailProvider } from '../../../providers/IMailProvider';
import { ITokenProvider } from '../../../providers/ITokenProvider';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { User } from '../../../entities/User';
import { ExecuteError } from '../../../errors/ExecuteError';
import { hash, genSalt } from 'bcrypt';
import { USER_VERIFICATION_SECRET } from '../../../utils/secrets';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private tokenProvider: ITokenProvider,
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<User> {
    try {
      analyzeDTO(data);
    } catch (err) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: err.message,
        },
        status: 400,
      });
    }

    const { email, password, name } = data;

    if (await this.usersRepository.findByEmail(email)) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'User already exists.',
        },
        status: 409,
      });
    }

    const hashedPassword: string = await hash(password, await genSalt(16));

    const user: User = new User({
      email,
      password: hashedPassword,
      name,
    });

    await this.usersRepository.save(user);

    const token: string = this.tokenProvider.generateToken(
      { id: user.user_id },
      USER_VERIFICATION_SECRET,
      false,
    );

    try {
      await this.mailProvider.sendMail({
        to: {
          email,
          name,
        },
        from: {
          email: process.env.NOREPLY_EMAIL_ADDRESS,
          name: process.env.NOREPLY_EMAIL_NAME,
        },
        subject: process.env.USER_VERIFICATION_EMAIL_SUBJECT.replace(
          '{name}',
          name.split(' ')[0],
        ),
        body: process.env.USER_VERIFICATION_EMAIL_BODY.replace(
          '{name}',
          name,
        ).replaceAll('{token}', token),
      });
    } catch (err) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Unexpected error ocurred while sending an email.',
        },
        status: 500,
      });
    }

    return user;
  }
}
