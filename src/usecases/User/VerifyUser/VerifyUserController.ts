import { VerifyUserUseCase } from './VerifyUserUseCase'
import { Request, Response } from 'express'

export class VerifyUserController {
  constructor(
    private verifyUserUseCase: VerifyUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.params;

    try {
      await this.verifyUserUseCase.execute({ token });

      return response.json();
    } catch (err) {
      return response.status((err.hasOwnProperty('status') ? err.status : 500)).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}
