import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { ITokenProvider } from '../../../providers/ITokenProvider';
import { ITwoFactorAuthenticateUserRequestDTO } from './TwoFactorAuthenticateUserDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { ExecuteError } from '../../../errors/ExecuteError';
import { User } from '../../../entities/User';
import speakeasy from 'speakeasy';
import { USER_SESSION_SECRET } from '../../../utils/secrets';

export class TwoFactorAuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokenProvider: ITokenProvider,
  ) {}

  async execute(data: ITwoFactorAuthenticateUserRequestDTO) {
    try {
      analyzeDTO(data);
    } catch (err) {
      throw new ExecuteError({
        message: err.message,
        status: 400,
      });
    }

    const { user_id, token, KMSI } = data;

    const user: User = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new ExecuteError({
        message: 'User not found',
        status: 404,
      });
    }

    const { secret, root } = user;

    const verified: boolean = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 2,
    });

    if (!verified) {
      throw new ExecuteError({
        message: 'Invalid token.',
        status: 401,
      });
    }

    const session: string = this.tokenProvider.generateToken(
      { id: user_id, root },
      USER_SESSION_SECRET,
      KMSI,
    );

    return session;
  }
}
