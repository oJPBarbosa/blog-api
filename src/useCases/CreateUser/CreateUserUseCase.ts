import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IMailProvider } from '../../providers/IMailProvider'
import { ITokenProvider } from '../../providers/ITokenProvider'
import { ICreateUserRequestDTO } from './CreateUserDTO'
import { User } from '../../entities/User'
import { genSaltSync, hashSync } from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private JWTTokenProvider: ITokenProvider,
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<string> {
    const userAlreadyExists: User = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
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

    return token;
  }
}