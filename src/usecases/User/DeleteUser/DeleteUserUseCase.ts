import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { IDeleteUserRequestDTO } from './DeleteUserDTO'
import { User } from '../../../entities/User'
import { ExecuteError } from '../../../utils/ExecuteError'

export class DeleteUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IDeleteUserRequestDTO): Promise<void> {
    const user: User = await this.usersRepository.findById(data.user_id);

    if (!user) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'User not found.',
        },
        status: 404,
      });
    }

    await this.usersRepository.destroy(user);
  }
}