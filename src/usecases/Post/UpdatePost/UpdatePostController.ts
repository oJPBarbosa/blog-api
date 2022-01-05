import { UpdatePostUseCase } from './UpdatePostUseCase'
import { Request, Response } from 'express'

export class UpdatePostController {
  constructor(
    private updatePostUseCase: UpdatePostUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const post_id = request.params.id;
    const { en, pt } = request.body;

    try {
      await this.updatePostUseCase.execute({
        post_id,
        en,
        pt,
      });

      return response.status(200).send();
    } catch (err) {
      return response.status((err.hasOwnProperty('status') ? err.status : 500)).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}