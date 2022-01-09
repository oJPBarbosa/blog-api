import { ViewPostUseCase } from './ViewPostUseCase'
import { Request, Response } from 'express'

export class ViewPostController {
  constructor(
    private viewPostUseCase: ViewPostUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const post_id = request.params.id;

    try {
      const views: number = await this.viewPostUseCase.execute({ post_id });

      return response.json({ views });
    } catch (err) {
      return response.status((err.hasOwnProperty('status') ? err.status : 500)).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}