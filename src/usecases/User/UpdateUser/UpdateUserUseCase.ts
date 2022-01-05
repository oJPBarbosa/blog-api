import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository'
import { UpdateUserRequestDTO } from './UpdateUserDTO'
import { User } from '../../../entities/User'
import { ExecuteError } from '../../../exceptions/ExecuteError'

export class UpdateUserUseCase {
  constructor(
    private usersRepository: PostgresUsersRepository,
  ) {}

  async execute(data: UpdateUserRequestDTO): Promise<void> {
    const {
      user_id,
      name,
      email,
      password,
      avatar,
      biography,
      authorized,
      verified,
      root,
    } = data;

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

    user.name = name;
    user.email = email;
    user.password = password;
    user.avatar = avatar;
    user.biography_en = biography?.en;
    user.biography_pt = biography?.pt;
    user.authorized = authorized;
    user.verified = verified;
    user.root = root;
    user.updated_at = new Date();

    await this.usersRepository.save(user);
  }
}