import { DeleteUserUseCase } from './DeleteUserUseCase'
import { Request, Response } from 'express'

export class DeleteUserController {
  constructor(
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    try {
      await this.deleteUserUseCase.execute({ id });

      return response.send();
    } catch (err) {
      return response.status(400).send({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}