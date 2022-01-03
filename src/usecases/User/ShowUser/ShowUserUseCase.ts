import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { ShowUserRequestDTO } from './ShowUserDTO'
import { User } from '../../../entities/User'
import { ExecuteError } from '../../../exceptions/ExecuteError'

export class ShowUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ShowUserRequestDTO): Promise<object[] | object> {
    if (data.all) {
      return (await this.usersRepository.findAll()).map((user: User) => {
        return {
          id: user.user_id,
          name: user.name,
          avatar: user.avatar,
          authorized: user.authorized,
          verified: user.verified,
          root: user.root,
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
      authorized: user.authorized,
      verified: user.verified,
      root: user.root,
    };
  }
}