import { DeleteUserUseCase } from './DeleteUserUseCase'
import { Request, Response } from 'express'

export class DeleteUserController {
  constructor(
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.id;

    try {
      await this.deleteUserUseCase.execute({ user_id });

      return response.send();
    } catch (err) {
      return response.status((err.hasOwnProperty('status') ? err.status : 500)).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}