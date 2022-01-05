import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { IVerifyUserRequestDTO } from './VerifyUserDTO'
import { JwtPayload, verify } from 'jsonwebtoken'
import { USER_VERIFICATION_SECRET } from '../../../utils/secrets'
import { User } from '../../../entities/User'
import { ExecuteError } from '../../../exceptions/ExecuteError'

export class VerifyUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IVerifyUserRequestDTO): Promise<void> {
    const { token } = data;

    let payload: string | JwtPayload = null;
    try {
      payload = (verify(token, USER_VERIFICATION_SECRET));
    } catch (err) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Invalid token.',
        },
        status: 401,
      });
    }

    if (typeof payload === 'string') {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Invalid token.',
        },
        status: 401,
      });
    }

    const { id } = payload;

    const user: User = await this.usersRepository.findById(id);

    if (!user) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'User not found.',
        },
        status: 404,
      });
    }

    if (user.verified) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'User already verified.',
        },
        status: 409,
      });
    }
  
    user.verified = true;

    await this.usersRepository.save(user);
  }
}