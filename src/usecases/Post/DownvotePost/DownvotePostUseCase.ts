import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { DownvotePostRequestDTO } from './DownvotePostDTO'
import { ExecuteError } from '../../../exceptions/ExecuteError'

export class DownvotePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: DownvotePostRequestDTO): Promise<void> {
    const { post_id } = data;

    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Post not found.',
        },
        status: 404,
      });
    }

    post.votes--;

    await this.postsRepository.save(post);
  }
}