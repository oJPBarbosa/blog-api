import { ICommentsRepository } from '../../../repositories/ICommentsRepository';
import { IPostsRepository } from '../../../repositories/IPostsRepository';
import { CreateCommentRequestDTO } from './CreateCommentDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { Comment } from '../../../entities/Comment';
import { Post } from '../../../entities/Post';
import { ExecuteError } from '../../../errors/ExecuteError';

export class CreateCommentUseCase {
  constructor(
    private commentsRepository: ICommentsRepository,
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: CreateCommentRequestDTO): Promise<Comment> {
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

    const { post_id, email, name, provider, content } = data;

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

    const comment: Comment = new Comment({
      post_id,
      email,
      name,
      provider,
      content,
    });

    await this.commentsRepository.save(comment);

    return comment;
  }
}
