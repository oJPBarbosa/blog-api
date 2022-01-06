import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { UpvotePostRequestDTO } from './UpvotePostDTO'
import { analyseDTO } from '../../../errors/DTOError'
import { ExecuteError } from '../../../errors/ExecuteError'

export class UpvotePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: UpvotePostRequestDTO): Promise<void> {
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