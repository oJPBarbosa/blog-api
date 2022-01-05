import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'
import { User } from '../../../entities/User'

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      email,
      password,
      name,
      avatar,
      biography
    } = request.body;

    try {
      const user: User = await this.createUserUseCase.execute({
        email,
        password,
        name,
        avatar,
        biography,
      });
  
      return response.status(201).json({ id: user.user_id });
    } catch (err) {
      return response.status((err.hasOwnProperty('status') ? err.status : 500)).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}