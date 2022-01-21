import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IDeleteUserRequestDTO } from './DeleteUserDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { ExecuteError } from '../../../errors/ExecuteError';
import { User } from '../../../entities/User';

export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IDeleteUserRequestDTO): Promise<void> {
    try {
      analyzeDTO(data);
    } catch (err) {
      throw new ExecuteError({
        message: err.message,
        status: 400,
      });
    }

    const { source_user_id, target_user_id } = data;

    const sourceUser: User = await this.usersRepository.findById(
      source_user_id,
    );
    const targetUser: User = await this.usersRepository.findById(
      target_user_id,
    );

    if (!sourceUser || !targetUser) {
      throw new ExecuteError({
        message: `${sourceUser ? 'Target' : 'Source'} user not found.`,
        status: 404,
      });
    }

    if (sourceUser.user_id === targetUser.user_id || !sourceUser.root) {
      throw new ExecuteError({
        message: 'Unauthorized.',
        status: 403,
      });
    }

    await this.usersRepository.destroy(targetUser);
  }
}
