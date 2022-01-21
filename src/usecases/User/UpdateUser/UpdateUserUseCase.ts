import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository';
import { IUpdateUserRequestDTO } from './UpdateUserDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { ExecuteError } from '../../../errors/ExecuteError';
import { User } from '../../../entities/User';

export class UpdateUserUseCase {
  constructor(private usersRepository: PostgresUsersRepository) {}

  async execute(data: IUpdateUserRequestDTO): Promise<void> {
    const { source_user_id, target_user_id } = data;

    try {
      analyzeDTO({ source_user_id, target_user_id });
    } catch (err) {
      throw new ExecuteError({
        message: err.message,
        status: 400,
      });
    }

    const {
      name,
      email,
      password,
      avatar,
      biography,
      authorized,
      verified,
      root,
    } = data;

    const sourceUser: User = await this.usersRepository.findById(
      source_user_id,
    );
    const targetUser: User = await this.usersRepository.findById(
      target_user_id,
    );

    if (!sourceUser || !targetUser) {
      throw new ExecuteError({
        message: `Update ${sourceUser ? 'target' : 'source'} user not found.`,
        status: 404,
      });
    }

    if (sourceUser === targetUser || sourceUser.root) {
      targetUser.name = name;
      targetUser.email = email;
      targetUser.password = password;
      targetUser.avatar = avatar;
      targetUser.biography_en = biography?.en;
      targetUser.biography_pt = biography?.pt;
    }

    if (sourceUser.root) {
      targetUser.authorized = authorized;
      targetUser.verified = verified;
      targetUser.root = root;
    }

    await this.usersRepository.save(targetUser);
  }
}
