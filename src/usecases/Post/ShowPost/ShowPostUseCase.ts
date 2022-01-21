import { IPostsRepository } from '../../../repositories/IPostsRepository';
import { ShowPostRequestDTO } from './ShowPostDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { Post } from '../../../entities/Post';
import { ExecuteError } from '../../../errors/ExecuteError';
import { Comment } from '../../../entities/Comment';

export class ShowPostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(data: ShowPostRequestDTO): Promise<object[] | object> {
    try {
      analyzeDTO(data);
    } catch (err) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: err.message,
        },
        status: 400,
      });
    }

    const { post_id, slug } = data;

    if (post_id) {
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
        views: Number(post.views),
        en: {
          slug: post.slug_en,
          title: post.title_en,
          description: post.description_en,
          tags: post.tags_en,
          reading_time: post.reading_time_en,
          content: post.content_en,
        },
        pt: {
          slug: post.slug_pt,
          title: post.title_pt,
          description: post.description_pt,
          tags: post.tags_pt,
          reading_time: post.reading_time_pt,
          content: post.content_pt,
        },
        created_at: post.created_at,
        updated_at: post.updated_at,
        author: {
          name: post.author?.name,
          avatar: post.author?.avatar,
          biography: {
            en: post.author?.biography_en,
            pt: post.author?.biography_pt,
          },
        },
        comments: post.comments?.map((comment: Comment) => {
          return {
            id: comment.comment_id,
            name: comment.name,
            provider: comment.provider,
            content: comment.content,
            created_at: comment.created_at,
            updated_at: comment.updated_at,
          };
        }),
      };
    }

    if (slug) {
      const post: Post = await this.postsRepository.findBySlug(
        slug.language,
        slug.slug,
      );

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
        views: Number(post.views),
        en: {
          slug: post.slug_en,
          title: post.title_en,
          description: post.description_en,
          tags: post.tags_en,
          reading_time: post.reading_time_en,
          content: post.content_en,
        },
        pt: {
          slug: post.slug_pt,
          title: post.title_pt,
          description: post.description_pt,
          tags: post.tags_pt,
          reading_time: post.reading_time_pt,
          content: post.content_pt,
        },
        created_at: post.created_at,
        updated_at: post.updated_at,
        author: {
          name: post.author?.name,
          avatar: post.author?.avatar,
          biography: {
            en: post.author?.biography_en,
            pt: post.author?.biography_pt,
          },
        },
        comments: post.comments?.map((comment: Comment) => {
          return {
            id: comment.comment_id,
            name: comment.name,
            provider: comment.provider,
            content: comment.content,
            created_at: comment.created_at,
            updated_at: comment.updated_at,
          };
        }),
      };
    }

    return (await this.postsRepository.findAll()).map((post: Post) => {
      return {
        id: post.post_id,
        views: Number(post.views),
        en: {
          slug: post.slug_en,
          title: post.title_en,
          description: post.description_en,
          tags: post.tags_en,
          reading_time: post.reading_time_en,
          content: post.content_en,
        },
        pt: {
          slug: post.slug_pt,
          title: post.title_pt,
          description: post.description_pt,
          tags: post.tags_pt,
          reading_time: post.reading_time_pt,
          content: post.content_pt,
        },
        created_at: post.created_at,
        updated_at: post.updated_at,
        author: {
          name: post.author?.name,
          avatar: post.author?.avatar,
          biography: {
            en: post.author?.biography_en,
            pt: post.author?.biography_pt,
          },
        },
        comments: post.comments?.map((comment: Comment) => {
          return {
            id: comment.comment_id,
            name: comment.name,
            provider: comment.provider,
            content: comment.content,
            created_at: comment.created_at,
            updated_at: comment.updated_at,
          };
        }),
      };
    });
  }
}
