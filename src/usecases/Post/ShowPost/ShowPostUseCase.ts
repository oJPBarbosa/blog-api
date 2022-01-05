import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { ShowPostRequestDTO } from './ShowPostDTO'
import { Post } from '../../../entities/Post'
import { ExecuteError } from '../../../exceptions/ExecuteError'

export class ShowPostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: ShowPostRequestDTO): Promise<object[] | object> {
    const { all, post_id } = data;

    if (all) {
      return (await this.postsRepository.findAll()).map((post: Post) => { 
        return {
          id: post.post_id,
          en: {
            title: post.title_en,
            description: post.description_en,
            tags: post.tags_en,
            content: post.content_en,
          },
          pt: {
            title: post.title_pt,
            description: post.description_pt,
            tags: post.tags_pt,
            content: post.content_pt,
          },
          votes: post.votes,
          created_at: post.created_at,
          updated_at: post.updated_at,
          author: {
            id: post.author?.user_id,
            name: post.author?.name,
            avatar: post.author?.avatar,
            biography: {
              en: post.author?.biography_en,
              pt: post.author?.biography_pt,
            },
          },
        }
      });
    }

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

    return {
      id: post.post_id,
      en: {
        title: post.title_en,
        description: post.description_en,
        tags: post.tags_en,
        content: post.content_en,
      },
      pt: {
        title: post.title_pt,
        description: post.description_pt,
        tags: post.tags_pt,
        content: post.content_pt,
      },
      votes: post.votes,
      created_at: post.created_at,
      updated_at: post.updated_at,
      author: {
        id: post.author?.user_id,
        name: post.author?.name,
        avatar: post.author?.avatar,
        biography: {
          en: post.author?.biography_en,
          pt: post.author?.biography_pt,
        },
      },
    };
  }
}
