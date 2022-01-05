import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { ITokenProvider } from '../../../providers/ITokenProvider'
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO'
import { User } from '../../../entities/User'
import { ExecuteError } from '../../../exceptions/ExecuteError'
import { compare } from 'bcrypt'
import { USER_SESSION_SECRET } from '../../../utils/secrets'

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokenProvider: ITokenProvider,
  ) {}

  async execute(data: IAuthenticateUserRequestDTO): Promise<string> {
    const { email, password, KMSI } = data;

    const user: User = await this.usersRepository.findByEmail(email);

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

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Invalid password.',
        },
        status: 401,
      });
    }

    return this.tokenProvider.generateToken({ id: user.user_id, root: user.root }, USER_SESSION_SECRET, KMSI);
  }
}