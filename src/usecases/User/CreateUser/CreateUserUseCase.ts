import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { IMailProvider } from '../../../providers/IMailProvider'
import { ITokenProvider } from '../../../providers/ITokenProvider'
import { ICreateUserRequestDTO } from './CreateUserDTO'
import { User } from '../../../entities/User'
import { ExecuteError } from '../../../utils/ExecuteError'
import { genSaltSync, hashSync } from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private JWTTokenProvider: ITokenProvider,
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<{ user: User; token: string }> {
    const userAlreadyExists: User = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'User already exists.',
        },
        status: 303,
      });
    }

    data.password = hashSync(data.password, genSaltSync());

    const user: User = new User(data);
    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        email: data.email,
        name: data.name,
      },
      from: {
        email: process.env.EMAIL_ADDRESS,
        name: process.env.EMAIL_NAME,
      },
      subject: process.env.EMAIL_SUBJECT,
      body: process.env.EMAIL_BODY,
    });

    const token: string = this.JWTTokenProvider.generateToken({ id: user.user_id });

    return { user, token };
  }
}