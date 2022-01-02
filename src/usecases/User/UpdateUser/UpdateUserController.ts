import { Request, Response } from 'express'
import { UpdateUserUseCase } from './UpdateUserUseCase'

export class UpdateUserController {
  constructor(
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const user_id = req.params.id;
      const { name, email, password, avatar, authorized } = req.body;

      await this.updateUserUseCase.execute({
        user_id,
        name,
        email,
        password,
        avatar,
        authorized,
      });

      return res.send();
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.',
      })
    }
  }
}