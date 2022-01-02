import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO'
import { User } from '../../../entities/User'
import { compare } from 'bcrypt'
import { ITokenProvider } from '../../../providers/ITokenProvider'

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private JWTTokenProvider: ITokenProvider,
  ) {}

  async execute(data: IAuthenticateUserRequestDTO): Promise<string> {
    const user: User = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new Error('User not found.');
    }

    if (!user.authorized) {
      throw new Error('User not authorized.');
    }

    const passwordMatches = await compare(data.password, user.password);

    if (!passwordMatches) {
      throw new Error('Invalid password.');
    }

    return this.JWTTokenProvider.generateToken({ id: user.user_id });
  }
}