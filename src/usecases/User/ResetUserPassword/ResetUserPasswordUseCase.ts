import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { ITokenProvider } from '../../../providers/ITokenProvider';
import { IResetUserPasswordRequestDTO } from './ResetUserPasswordDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { ExecuteError } from '../../../errors/ExecuteError';
import { JwtPayload, verify } from 'jsonwebtoken';
import {
  USER_RESET_PASSWORD_SECRET,
  USER_SESSION_SECRET,
} from '../../../utils/secrets';
import { User } from '../../../entities/User';
import { hash, genSalt } from 'bcrypt';

export class ResetUserPasswordUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokenProvider: ITokenProvider,
  ) {}

  async execute(data: IResetUserPasswordRequestDTO): Promise<string> {
    try {
      analyzeDTO(data);
    } catch (err) {
      throw new ExecuteError({
        message: err.message,
        status: 400,
      });
    }

    const { token, password } = data;

    let payload: string | JwtPayload = null;
    try {
      payload = verify(token, USER_RESET_PASSWORD_SECRET);
    } catch (err) {
      throw new ExecuteError({
        message: 'Invalid token.',
        status: 401,
      });
    }

    if (typeof payload === 'string') {
      throw new ExecuteError({
        message: 'Invalid token.',
        status: 401,
      });
    }

    const { id } = payload;

    const user: User = await this.usersRepository.findById(id);

    user.password = await hash(password, await genSalt(16));

    await this.usersRepository.save(user);

    const session: string = this.tokenProvider.generateToken(
      { id: user.user_id },
      USER_SESSION_SECRET,
      false,
    );

    return session;
  }
}
