import { Request, Response } from 'express'
import { UpdateUserUseCase } from './UpdateUserUseCase'

export class UpdateUserController {
  constructor(
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, email, password, avatar } = req.body;

      await this.updateUserUseCase.execute({
        id,
        name,
        email,
        password,
        avatar,
      });

      return res.send();
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.',
      })
    }
  }
}