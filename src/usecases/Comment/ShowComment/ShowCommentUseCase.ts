import { ICommentsRepository } from '../../../repositories/ICommentsRepository';
import { IPostsRepository } from '../../../repositories/IPostsRepository';
import { IShowCommentRequestDTO } from './ShowCommentDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { ExecuteError } from '../../../errors/ExecuteError';
import { Comment } from '../../../entities/Comment';
import { Post } from '../../../entities/Post';

export class ShowCommentUseCase {
  constructor(
    private commentsRepository: ICommentsRepository,
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: IShowCommentRequestDTO): Promise<object[] | object> {
    try {
      analyzeDTO(data);
    } catch (err) {
      throw new ExecuteError({
        message: err.message,
        status: 400,
      });
    }

    const { comment_id, post_id, slug } = data;
    let comments: Comment[];

    if (comment_id) {
      const comment: Comment = await this.commentsRepository.findById(
        comment_id,
      );

      if (!comment) {
        throw new ExecuteError({
          message: 'Comment not found.',
          status: 404,
        });
      }

      return {
        id: comment.comment_id,
        name: comment.name,
        provider: comment.provider,
        content: comment.content,
        created_at: comment.created_at,
      };
    } else if (post_id) {
      const post: Post = await this.postsRepository.findById(post_id);

      if (!post) {
        throw new ExecuteError({
          message: 'Post not found.',
          status: 404,
        });
      }

      comments = await this.commentsRepository.findByPostId(post_id);
    } else if (slug) {
      const post: Post = await this.postsRepository.findBySlug(
        slug.language,
        slug.slug,
      );

      if (!post) {
        throw new ExecuteError({
          message: 'Post not found.',
          status: 404,
        });
      }

      comments = await this.commentsRepository.findByPostId(post.post_id);
    } else {
      comments = await this.commentsRepository.findAll();
    }

    return comments?.map((comment: Comment) => {
      return {
        id: comment.comment_id,
        name: comment.name,
        provider: comment.provider,
        content: comment.content,
        created_at: comment.created_at,
      };
    });
  }
}
