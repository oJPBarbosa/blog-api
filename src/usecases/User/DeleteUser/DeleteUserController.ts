import { DeleteUserUseCase } from './DeleteUserUseCase'
import { Request, Response } from 'express'

export class DeleteUserController {
  constructor(
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const target_user_id = request.params.id;
    const { source_user_id } = request.body;

    try {
      await this.deleteUserUseCase.execute({
        source_user_id,
        target_user_id,
      });

      return response.json({ message: 'User deleted.' });
    } catch (err) {
      return response.status((err.hasOwnProperty('status') ? err.status : 500)).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}