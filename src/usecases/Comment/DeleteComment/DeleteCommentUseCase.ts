import 'dotenv/config';
import { ICommentsRepository } from '../../../repositories/ICommentsRepository';
import { IPostsRepository } from '../../../repositories/IPostsRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IMailProvider } from '../../../providers/IMailProvider';
import { IDeleteCommentRequestDTO } from './DeleteCommentDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { ExecuteError } from '../../../errors/ExecuteError';
import { Comment } from '../../../entities/Comment';
import { Post } from '../../../entities/Post';
import { User } from '../../../entities/User';

export class DeleteCommentUseCase {
  constructor(
    private commentsRepository: ICommentsRepository,
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: IDeleteCommentRequestDTO): Promise<void> {
    try {
      analyzeDTO(data);
    } catch (err) {
      throw new ExecuteError({
        message: err.message,
        status: 400,
      });
    }

    const { source_user_id, comment_id } = data;

    const comment: Comment = await this.commentsRepository.findById(comment_id);

    if (!comment) {
      throw new ExecuteError({
        message: 'Comment not found',
        status: 404,
      });
    }

    const post: Post = await this.postsRepository.findById(comment.post_id);

    if (!post) {
      throw new ExecuteError({
        message: 'Post not found',
        status: 404,
      });
    }

    const user: User = await this.usersRepository.findById(source_user_id);

    if (!user) {
      throw new ExecuteError({
        message: 'User not found',
        status: 404,
      });
    }

    if (user.user_id === post.author_id || user.root) {
      await this.commentsRepository.destroy(comment);
    }

    await this.mailProvider.sendMail({
      to: {
        email: comment.email,
        name: comment.name,
      },
      from: {
        email: process.env.NOREPLY_EMAIL_ADDRESS,
        name: process.env.NOREPLY_EMAIL_NAME,
      },
      subject: process.env.COMMENT_DELETED_EMAIL_SUBJECT.replace(
        '{name}',
        comment.name.split(' ')[0],
      ),
      body: process.env.COMMENT_DELETED_EMAIL_BODY.replace(
        '{name}',
        comment.name.split(' ')[0],
      )
        .replaceAll('{slug}', post.slug_en)
        .replace('{post.title}', post.title_en)
        .replace('{comment.content}', comment.content)
        .replace('{comment.created_at}', comment.created_at.toISOString()),
    });
  }
}
