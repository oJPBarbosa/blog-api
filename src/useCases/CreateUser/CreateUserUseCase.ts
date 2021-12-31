import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO'
import { User } from '../../entities/User'
import { genSaltSync, hashSync } from 'bcrypt'
import { IMailProvider } from '../../providers/IMailProvider'

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<User> {
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
        email: 'jpfb.dev',
        name: 'website@jpfb.dev',
      },
      subject: 'Welcome!',
      body: '<p>Hey!<p>',
    });

    return user;
  }
}