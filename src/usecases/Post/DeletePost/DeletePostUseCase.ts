import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { DeletePostRequestDTO } from './DeletePostDTO'
import { Post } from '../../../entities/Post'

export class DeletePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: DeletePostRequestDTO): Promise<void> {
    const post: Post = await this.postsRepository.findById(data.post_id);

    if (!post) {
      throw new Error('Post not found.');
    }

    await this.postsRepository.destroy(post);
  }
}