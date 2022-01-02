import { Request, Response } from 'express'
import { UpdateUserUseCase } from './UpdateUserUseCase'

export class UpdateUserController {
  constructor(
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.params.id;
      const { name, email, password, avatar, authorized } = request.body;

      await this.updateUserUseCase.execute({
        user_id,
        name,
        email,
        password,
        avatar,
        authorized,
      });

      return response.send();
    } catch (err) {
      return response.status(err.status).json({
        [err._message.key || 'error']: err._message.value || 'Unexpected error.',
      });
    }
  }
}