import { CreateCommentUseCase } from './CreateCommentUseCase';
import { Request, Response } from 'express';
import { Comment } from '../../../entities/Comment';

export class CreateCommentController {
  constructor(private createCommentUseCase: CreateCommentUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const post_id = request.params.id;

    const { email, name, provider, content } = request.body;

    try {
      const comment: Comment = await this.createCommentUseCase.execute({
        post_id,
        email,
        name,
        provider,
        content,
      });

      return response.status(201).json({ id: comment.comment_id });
    } catch (err) {
      return response
        .status(err.hasOwnProperty('status') ? err.status : 500)
        .json({
          [err._message?.key || 'error']:
            err._message?.value || 'Unexpected error.',
        });
    }
  }
}
