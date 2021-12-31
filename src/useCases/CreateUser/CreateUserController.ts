import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'
import { User } from '../../entities/User'

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, name, avatar } = request.body;

    try {
      const user: User = await this.createUserUseCase.execute({
        email,
        password,
        name,
        avatar,
        authorized: false,
      });
  
      return response.status(201).send({ id: user.user_id });
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}