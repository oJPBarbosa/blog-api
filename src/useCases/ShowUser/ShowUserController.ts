import { ShowUserUseCase } from './ShowUserUseCase';
import { Response, Request } from 'express'

export class ShowUserController {
  constructor(
    private showUserUseCase: ShowUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.id;

    try {
      const user = await this.showUserUseCase.execute({
        user_id,
      });

      return response.json({
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        authorized: user.authorized,
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}