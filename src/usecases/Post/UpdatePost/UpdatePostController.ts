import { UpdatePostUseCase } from './UpdatePostUseCase';
import { Request, Response } from 'express';

export class UpdatePostController {
  constructor(private updatePostUseCase: UpdatePostUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const target_post_id = request.params.id;
    const { source_user_id, views, en, pt } = request.body;

    try {
      await this.updatePostUseCase.execute({
        source_user_id,
        target_post_id,
        views,
        en,
        pt,
      });

      return response.json({ message: 'Post updated.' });
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
