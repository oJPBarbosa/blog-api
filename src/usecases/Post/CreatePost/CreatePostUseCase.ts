import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { CreatePostRequestDTO } from './CreatePostDTO'
import { User } from '../../../entities/User'
import { ExecuteError } from '../../../utils/ExecuteError'
import { Post } from '../../../entities/Post'

export class CreatePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: CreatePostRequestDTO): Promise<Post> {
    const { author_id, title, description, tags, content } = data;

    const user: User = await this.usersRepository.findById(author_id);

    if (!user) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'User not found.',
        },
        status: 404,
      });
    }

    const post: Post = new Post({
      author_id,
      title,
      description,
      tags,
      content,
    });

    await this.postsRepository.save(post);

    return post;
  }
}