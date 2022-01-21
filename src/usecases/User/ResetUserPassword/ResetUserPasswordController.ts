import { ResetUserPasswordUseCase } from './ResetUserPasswordUseCase';
import { Request, Response } from 'express';

export class ResetUserPasswordController {
  constructor(private resetUserPasswordUseCase: ResetUserPasswordUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    try {
      const session: string = await this.resetUserPasswordUseCase.execute({
        token,
        password,
      });

      return response.json({ token: session });
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
