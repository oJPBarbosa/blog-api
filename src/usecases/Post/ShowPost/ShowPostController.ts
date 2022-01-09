import { ShowPostUseCase } from './ShowPostUseCase'
import { Request, Response } from 'express'

export class ShowPostController {
  constructor(
    private showPostUseCase: ShowPostUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    try {
      if (!id) {
        const posts: object[] | object = await this.showPostUseCase.execute({ all: true });

        return response.json(posts);
      }

      const post: object[] | object = await this.showPostUseCase.execute({ post_id: id.toString() });

      return response.json(post);
    } catch (err) {
      return response.status((err.hasOwnProperty('status') ? err.status : 500)).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}