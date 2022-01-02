import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, name, avatar } = request.body;

    try {
      const { user, token } = await this.createUserUseCase.execute({
        email,
        password,
        name,
        avatar,
        authorized: false,
      });
  
      return response.status(201).json({ id: user.user_id, token });
    } catch (err) {
      return response.status(err.status).json({
        [err._message.key || 'error']: err._message.value || 'Unexpected error.',
      });
    }
  }
}