import { ViewPostUseCase } from './ViewPostUseCase';
import { Request, Response } from 'express';

export class ViewPostController {
  constructor(private viewPostUseCase: ViewPostUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { slug } = request.body;

    try {
      const views: number = await this.viewPostUseCase.execute({ slug });

      return response.json({ views });
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
