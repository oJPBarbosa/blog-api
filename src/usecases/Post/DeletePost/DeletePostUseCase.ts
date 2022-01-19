import { IPostsRepository } from '../../../repositories/IPostsRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { DeletePostRequestDTO } from './DeletePostDTO';
import { analyseDTO } from '../../../errors/DTOError';
import { Post } from '../../../entities/Post';
import { ExecuteError } from '../../../errors/ExecuteError';

export class DeletePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: DeletePostRequestDTO): Promise<void> {
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

    const { source_user_id, post_id } = data;

    const sourceUser = await this.usersRepository.findById(source_user_id);
    const post: Post = await this.postsRepository.findById(post_id);

    if (!sourceUser || !post) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: `${sourceUser ? 'Post' : 'Source user'} not found.`,
        },
        status: 404,
      });
    }

    if (sourceUser.user_id !== post.author_id || !sourceUser.root) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Unauthorized.',
        },
        status: 403,
      });
    }

    await this.postsRepository.destroy(post);
  }
}
