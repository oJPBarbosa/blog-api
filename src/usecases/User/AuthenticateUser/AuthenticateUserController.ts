import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, KMSI } = request.body;

    try {
      const token = await this.authenticateUserUseCase.execute({
        email,
        password,
        KMSI,
      });

      return response.json({ token });
    } catch (err) {
      return response.status((err.hasOwnProperty('status') ? err.status : 500)).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}