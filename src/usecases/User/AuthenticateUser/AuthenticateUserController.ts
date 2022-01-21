import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { Request, Response } from 'express';

export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const id: string = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.json({ id });
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
