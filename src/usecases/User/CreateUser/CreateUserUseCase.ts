import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { IMailProvider } from '../../../providers/IMailProvider'
import { ICreateUserRequestDTO } from './CreateUserDTO'
import { User } from '../../../entities/User'
import { ExecuteError } from '../../../exceptions/ExecuteError'
import { hash, genSalt } from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<User> {
    const { 
      email, 
      password,
      name,
      avatar,
      biography,
    } = data;

    const userAlreadyExists: User = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'User already exists.',
        },
        status: 409,
      });
    }

    const hashedPassword = await hash(password, await genSalt(16));

    const user: User = new User({
      email,
      password: hashedPassword,
      name,
      avatar,
      biography_en: biography?.en,
      biography_pt: biography?.pt,
    });

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

    return user;
  }
}