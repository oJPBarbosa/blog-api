import dotenv from 'dotenv'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { IMailProvider } from '../../../providers/IMailProvider'
import { ITokenProvider } from '../../../providers/ITokenProvider'
import { ICreateUserRequestDTO } from './CreateUserDTO'
import { User } from '../../../entities/User'
import { ExecuteError } from '../../../exceptions/ExecuteError'
import { hash, genSalt } from 'bcrypt'
import { USER_VERIFICATION_SECRET } from '../../../utils/secrets'

dotenv.config()

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private tokenProvider: ITokenProvider,
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

    const token = this.tokenProvider.generateToken({ id: user.user_id }, USER_VERIFICATION_SECRET, false);

    await this.mailProvider.sendMail({
      to: {
        email: email,
        name: name,
      },
      from: {
        email: process.env.EMAIL_USER_VERIFICATION_ADDRESS,
        name: process.env.EMAIL_USER_VERIFICATION_NAME,
      },
      subject: process.env.EMAIL_USER_VERIFICATION_SUBJECT.replace('{name}', name.split(' ')[0]),
      body: ((process.env.EMAIL_USER_VERIFICATION_BODY.replace('{name}', name.split(' ')[0])).replace('{token}', token)).replace('{token}', token),
    });

    return user;
  }
}