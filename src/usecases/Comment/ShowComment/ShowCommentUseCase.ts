import { ICommentsRepository } from '../../../repositories/ICommentsRepository'
import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { IShowCommentRequestDTO } from './ShowCommentDTO'
import { analyseDTO } from '../../../errors/DTOError'
import { ExecuteError } from '../../../errors/ExecuteError'
import { Comment } from '../../../entities/Comment'
import { Post } from '../../../entities/Post'

export class ShowCommentUseCase {
  constructor(
    private commentsRepository: ICommentsRepository,
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: IShowCommentRequestDTO): Promise<object[] | object> {
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

    const { comment_id, post_id, slug } = data;
    let comments: Comment[] = [];

    if (comment_id) {
      const comment: Comment = await this.commentsRepository.findById(comment_id);

      if (!comment) {
        throw new ExecuteError({
          _message: {
            key: 'error',
            value: 'Comment not found.',
          },
          status: 404,
        });
      }

      return {
        name: comment.name,
        provider: comment.provider,
        content: comment.content,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
      };;
    }

    else if (post_id) {
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

      comments = await this.commentsRepository.findByPostId(post_id);
    }

    else if (slug) {
      const post: Post = await this.postsRepository.findBySlug(slug.language, slug.slug);

      if (!post) {
        throw new ExecuteError({
          _message: {
            key: 'error',
            value: 'Post not found.',
          },
          status: 404,
        });
      }

      comments = await this.commentsRepository.findByPostId(post.post_id);
    }

    else {
      comments = await this.commentsRepository.findAll();
    }

    return comments?.map((comment: Comment) => { 
      return {
        name: comment.name,
        provider: comment.provider,
        content: comment.content,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
      };
    });
  }
}