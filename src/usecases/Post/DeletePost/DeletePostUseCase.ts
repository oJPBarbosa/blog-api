import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { DeletePostRequestDTO } from './DeletePostDTO'
import { Post } from '../../../entities/Post'
import { ExecuteError } from '../../../errors/ExecuteError'

export class DeletePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: DeletePostRequestDTO): Promise<void> {
    const { post_id } = data;

    const post: Post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Post not found.',
        },
        status: 404,
      });
    }

    await this.postsRepository.destroy(post);
  }
}