import { DeletePostUseCase } from './DeletePostUseCase'
import { Request, Response } from 'express'

export class DeletePostController {
  constructor(
    private deleteUserUseCase: DeletePostUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const post_id = request.params.id;
  
    try {
      await this.deleteUserUseCase.execute({ post_id });

      response.status(200).send();
    } catch (err) {
      return response.status(err.status).json({
        [err._message.key || 'error']: err._message.value || 'Unexpected error.',
      });
    }
  }
}