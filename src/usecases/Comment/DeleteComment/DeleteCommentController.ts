import { DeleteCommentUseCase } from './DeleteCommentUseCase';
import { Request, Response } from 'express';

export class DeleteCommentController {
  constructor(private deleteCommentUseCase: DeleteCommentUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const comment_id: string = request.params.id;
    const { source_user_id } = request.body;

    try {
      await this.deleteCommentUseCase.execute({
        source_user_id,
        comment_id,
      });

      return response.json({ message: 'Comment deleted.' });
    } catch (err) {
      return response
        .status(err.hasOwnProperty('status') ? err.status : 500)
        .json({
          error: err.hasOwnProperty('message')
            ? err.message
            : 'Unexpected error.',
        });
    }
  }
}
