import { ShowPostUseCase } from './ShowPostUseCase'
import { Request, Response } from 'express'
import { Post } from '../../../entities/Post'

export class ShowPostController {
  constructor(
    private showPostUseCase: ShowPostUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    try {
      if (!id) {
        const posts = await this.showPostUseCase.execute({ all: true });

        return response.json(posts);
      }

      const post: object[] | object = await this.showPostUseCase.execute({ post_id: id.toString() });

      return response.json(post);
    } catch (err) {
      return response.status(err.status).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}