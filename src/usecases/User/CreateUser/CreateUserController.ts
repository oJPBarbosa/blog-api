import { CreateUserUseCase } from './CreateUserUseCase';
import { Request, Response } from 'express';
import { User } from '../../../entities/User';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, name } = request.body;

    try {
      const user: User = await this.createUserUseCase.execute({
        email,
        password,
        name,
      });

      return response.status(201).json({ id: user.user_id });
    } catch (err) {
      return response
        .status(err.hasOwnProperty('status') ? err.status : 500)
        .json({
          error: err.hasOwnProperty('message')
            ? err.message
            : 'Unexpected error.',
        });
    }
  }
}
