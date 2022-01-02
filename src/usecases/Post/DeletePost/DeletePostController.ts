import { DeletePostUseCase } from './DeletePostUseCase'
import { Request, Response } from 'express'

export class DeletePostController {
  constructor(
    private deleteUserUseCase: DeletePostUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const post_id = request.params.id;
  
    try {
      await this.deleteUserUseCase.execute({ post_id });

      response.status(200).send();
    } catch (err) {
      response.status(400).send({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}