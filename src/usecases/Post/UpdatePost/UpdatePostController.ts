import { UpdatePostUseCase } from './UpdatePostUseCase'
import { Request, Response } from 'express'

export class UpdatePostController {
  constructor(
    private updatePostUseCase: UpdatePostUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
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

      response.status(200).send();
    } catch (err) {
      response.status(400).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}