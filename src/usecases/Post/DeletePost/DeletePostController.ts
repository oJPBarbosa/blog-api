import { DeletePostUseCase } from './DeletePostUseCase';
import { Request, Response } from 'express';

export class DeletePostController {
  constructor(private deleteUserUseCase: DeletePostUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const post_id: string = request.params.id;
    const { source_user_id } = request.body;

    try {
      await this.deleteUserUseCase.execute({
        source_user_id,
        post_id,
      });

      response.json({ message: 'Post deleted.' });
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
