import { ShowPostUseCase } from './ShowPostUseCase'
import { Request, Response } from 'express'

export class ShowPostController {
  constructor(
    private showPostUseCase: ShowPostUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id, slug, language } = request.query;

    try {
      if (id) {
        const post: object[] | object = await this.showPostUseCase.execute({ post_id: id.toString() });

        return response.json(post);
      }

      if (slug) {
        const post: object[] | object = await this.showPostUseCase.execute({ 
          slug: {
            slug: slug.toString(),
            language: language.toString(),
          }
        });

        return response.json(post);
      }

      const posts: object[] | object = await this.showPostUseCase.execute({});

      return response.json(posts);
    } catch (err) {
      return response.status((err.hasOwnProperty('status') ? err.status : 500)).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}