import { TwoFactorAuthenticateUserUseCase } from './TwoFactorAuthenticateUserUseCase'
import { Request, Response } from 'express'

export class TwoFactorAuthenticateUserController {
  constructor(
    private twoFactorAuthenticateUserUseCase: TwoFactorAuthenticateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, token, KMSI } = request.body;
  
    try {
      const session: string = await this.twoFactorAuthenticateUserUseCase.execute({
        user_id,
        token, 
        KMSI,
      });
  
      return response.json({ token: session });
    } catch (err) {
      return response.status((err.hasOwnProperty('status') ? err.status : 500)).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}
