import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ShowUserRequestDTO } from './ShowUserDTO'
import { User } from '../../entities/User'

export class ShowUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ShowUserRequestDTO): Promise<User> {
    const user: User = await this.usersRepository.findById(data.user_id);

    if (!user) {
      throw new Error('User not found.');
    }

    return user;
  }
}