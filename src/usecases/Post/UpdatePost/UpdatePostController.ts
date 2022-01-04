import { UpdatePostUseCase } from './UpdatePostUseCase'
import { Request, Response } from 'express'

export class UpdatePostController {
  constructor(
    private updatePostUseCase: UpdatePostUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const post_id = request.params.id;
    const { title, description, tags, content } = request.body;

    try {
      await this.updatePostUseCase.execute({
        post_id,
        title,
        description,
        tags,
        content,
      });

      return response.status(200).send();
    } catch (err) {
      return response.status(err.status).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}