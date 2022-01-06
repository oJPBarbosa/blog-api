import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { IDeleteUserRequestDTO } from './DeleteUserDTO'
import { analyseDTO } from '../../../errors/DTOError'
import { User } from '../../../entities/User'
import { ExecuteError } from '../../../errors/ExecuteError'

export class DeleteUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

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
    
    const { user_id } = data;

    const user: User = await this.usersRepository.findById(user_id);

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