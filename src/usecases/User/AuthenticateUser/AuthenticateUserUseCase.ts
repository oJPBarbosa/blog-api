import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO'
import { User } from '../../../entities/User'
import { ExecuteError } from '../../../exceptions/ExecuteError'
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
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'User not found.',
        },
        status: 404,
      });
    }

    if (!user.authorized) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'User is not authorized.',
        },
        status: 401,
      });
    }

    const passwordMatches = await compare(data.password, user.password);

    if (!passwordMatches) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Invalid password.',
        },
        status: 401,
      });
    }

    return this.JWTTokenProvider.generateToken({ id: user.user_id });
  }
}