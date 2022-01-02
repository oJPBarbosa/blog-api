import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository'
import { UpdateUserRequestDTO } from './UpdateUserDTO'
import { User } from '../../../entities/User'

export class UpdateUserUseCase {
  constructor(
    private usersRepository: PostgresUsersRepository,
  ) {}

  async execute(data: UpdateUserRequestDTO): Promise<void> {
    const user: User = await this.usersRepository.findById(data.user_id);

    if (!user) {
      throw new Error('User not found.');
    }

    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    user.avatar = data.avatar;
    user.authorized = data.authorized;
    user.updated_at = new Date();

    await this.usersRepository.save(user);
  }
}