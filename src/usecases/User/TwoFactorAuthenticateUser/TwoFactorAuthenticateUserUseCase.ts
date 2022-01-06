import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { ITokenProvider } from '../../../providers/ITokenProvider'
import { ITwoFactorAuthenticateUserRequestDTO } from './TwoFactorAuthenticateUserDTO'
import speakeasy from 'speakeasy'
import { ExecuteError } from '../../../errors/ExecuteError'
import { USER_SESSION_SECRET } from '../../../utils/secrets'


export class TwoFactorAuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokenProvider: ITokenProvider,
  ) {}

  async execute(data: ITwoFactorAuthenticateUserRequestDTO) {
    const { user_id, token, KMSI } = data;

    const { secret, root } = await this.usersRepository.findById(user_id);

    const verified: boolean = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 2,
    });

    if (!verified) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Invalid token.',
        },
        status: 401,
      });
    }

    return this.tokenProvider.generateToken({ id: user_id, root }, USER_SESSION_SECRET, KMSI);
  }
}