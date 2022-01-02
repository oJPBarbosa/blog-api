import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { ShowPostRequestDTO } from './ShowPostDTO'
import { Post } from '../../../entities/Post'
import { ExecuteError } from '../../../exceptions/ExecuteError'

export class ShowPostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
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
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Post not found.',
        },
        status: 404,
      });
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
