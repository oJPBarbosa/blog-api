import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IDeleteUserRequestDTO } from './DeleteUserDTO'
import { User } from '../../entities/User'

export class DeleteUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IDeleteUserRequestDTO): Promise<void> {
    const user: User = await this.usersRepository.findById(data.user_id);

    if (!user) {
      throw new Error('User does not exists.');
    }

    await this.usersRepository.delete(user);
  }
}