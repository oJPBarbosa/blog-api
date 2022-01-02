import { IPostsRepository } from '../../repositories/IPostsRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ShowPostRequestDTO } from './ShowPostDTO'
import { Post } from '../../entities/Post'
import { User } from '../../entities/User'

export class ShowPostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private userRepository: IUsersRepository,
  ) {}

  async execute(data: ShowPostRequestDTO): Promise<{ post: Post, user: User }> {
    const post = await this.postsRepository.findById(data.post_id);

    if (!post) {
      throw new Error('Post not found.');
    }

    const user = await this.userRepository.findById(post.author_id);

    return { post, user };
  }
}
