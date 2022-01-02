import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { ShowPostRequestDTO } from './ShowPostDTO'
import { Post } from '../../../entities/Post'
import { User } from '../../../entities/User'

export class ShowPostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ShowPostRequestDTO): Promise<object[] | object> {
    if (data.all) {
      return (await this.postsRepository.findAll()).map((post: Post) => { 
        return { 
          id: post.post_id,
          title: post.title,
          description: post.description,
          tags: post.tags,
          content: post.content,
          created_at: post.created_at,
          updated_at: post.updated_at,
          author: {
            id: post.author?.user_id,
            name: post.author?.name,
            avatar: post.author?.avatar,
          },
        }
      });
    }

    const post: Post = await this.postsRepository.findById(data.post_id);

    if (!post) {
      throw new Error('Post not found.');
    }

    return {
      title: post.title,
      description: post.description,
      tags: post.tags,
      content: post.content,
      created_at: post.created_at,
      updated_at: post.updated_at,
      author: {
        id: post.author_id,
        name: post.author.name,
        avatar: post.author.avatar,
      },
    };
  }
}
