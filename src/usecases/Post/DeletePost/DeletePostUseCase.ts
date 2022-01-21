import { IPostsRepository } from '../../../repositories/IPostsRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IDeletePostRequestDTO } from './DeletePostDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { ExecuteError } from '../../../errors/ExecuteError';
import { User } from '../../../entities/User';
import { Post } from '../../../entities/Post';

export class DeletePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IDeletePostRequestDTO): Promise<void> {
    try {
      analyzeDTO(data);
    } catch (err) {
      throw new ExecuteError({
        message: err.message,
        status: 400,
      });
    }

    const { source_user_id, post_id } = data;

    const sourceUser: User = await this.usersRepository.findById(
      source_user_id,
    );
    const post: Post = await this.postsRepository.findById(post_id);

    if (!sourceUser || !post) {
      throw new ExecuteError({
        message: `${sourceUser ? 'Post' : 'Source user'} not found.`,
        status: 404,
      });
    }

    if (sourceUser.user_id !== post.author_id || !sourceUser.root) {
      throw new ExecuteError({
        message: 'Unauthorized.',
        status: 403,
      });
    }

    await this.postsRepository.destroy(post);
  }
}
