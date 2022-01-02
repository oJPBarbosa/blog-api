import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { ShowUserRequestDTO } from './ShowUserDTO'
import { User } from '../../../entities/User'
import { ExecuteError } from '../../../utils/ExecuteError'

export class ShowUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ShowUserRequestDTO): Promise<object[] | object> {
    if (data.all) {
      return (await this.usersRepository.findAll()).map((user: User) => {
        return {
          id: user.user_id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        }
      });
    }

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

    return { 
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    };
  }
}