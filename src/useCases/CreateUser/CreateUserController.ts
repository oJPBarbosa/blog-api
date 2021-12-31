import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, name, avatar } = request.body;

    try {
      const token = await this.createUserUseCase.execute({
        email,
        password,
        name,
        avatar,
        authorized: false,
      });
  
      return response.status(201).send({ token });
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}