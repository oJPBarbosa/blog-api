import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IDeleteUserRequestDTO } from './DeleteUserDTO';
import { analyseDTO } from '../../../errors/DTOError';
import { User } from '../../../entities/User';
import { ExecuteError } from '../../../errors/ExecuteError';

export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IDeleteUserRequestDTO): Promise<void> {
    try {
      analyseDTO(data);
    } catch (err) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: err.message,
        },
        status: 400,
      });
    }

    const { source_user_id, target_user_id } = data;

    const sourceUser = await this.usersRepository.findById(source_user_id);
    const targetUser: User = await this.usersRepository.findById(
      target_user_id,
    );

    if (!sourceUser || !targetUser) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: `${sourceUser ? 'Target' : 'Source'} user not found.`,
        },
        status: 404,
      });
    }

    if (sourceUser.user_id === targetUser.user_id || !sourceUser.root) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Unauthorized.',
        },
        status: 403,
      });
    }

    await this.usersRepository.destroy(targetUser);
  }
}
