import { ForgetUserPasswordUseCase } from './ForgetUserPasswordUseCase'
import { Request, Response } from 'express'

export class ForgetUserPasswordController {
  constructor(
    private forgetUserPasswordUseCase: ForgetUserPasswordUseCase,
    ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.params

    try {
      await this.forgetUserPasswordUseCase.execute({ email });

      return response.json({ message: 'Email with password reset sent.' });
    } catch (err) {
      return response.status((err.hasOwnProperty('status') ? err.status : 500)).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }  
}