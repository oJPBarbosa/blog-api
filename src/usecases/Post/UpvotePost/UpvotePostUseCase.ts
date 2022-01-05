import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { UpvotePostRequestDTO } from './UpvotePostDTO'
import { ExecuteError } from '../../../exceptions/ExecuteError'

export class UpvotePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: UpvotePostRequestDTO): Promise<void> {
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

    post.votes++;

    await this.postsRepository.save(post);
  }
}