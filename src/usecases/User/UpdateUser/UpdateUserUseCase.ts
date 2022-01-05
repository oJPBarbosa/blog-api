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
      source_user_id,
      target_user_id,
      name,
      email,
      password,
      avatar,
      biography,
      authorized,
      verified,
      root,
    } = data;

    const sourceUser: User = await this.usersRepository.findById(source_user_id);
    const targetUser: User = await this.usersRepository.findById(target_user_id);

    if (!sourceUser || !targetUser) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: `${sourceUser ? 'Target' : 'Source'} user not found.`,
        },
        status: 404,
      });
    }

    targetUser.name = name;
    targetUser.email = email;
    targetUser.password = password;
    targetUser.avatar = avatar;
    targetUser.biography_en = biography?.en;
    targetUser.biography_pt = biography?.pt;

    if (sourceUser.root) {
      targetUser.authorized = authorized;
      targetUser.verified = verified;
      targetUser.root = root;
    }

    targetUser.updated_at = new Date();

    await this.usersRepository.save(targetUser);
  }
}