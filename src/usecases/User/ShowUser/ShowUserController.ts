import { ShowUserUseCase } from './ShowUserUseCase';
import { Response, Request } from 'express'

export class ShowUserController {
  constructor(
    private showUserUseCase: ShowUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    try {
      if (!id) {
        const users = await this.showUserUseCase.execute({ all: true });

        return response.json(users);  
      }

      const user = await this.showUserUseCase.execute({ user_id: id.toString() });

      return response.json(user);
    } catch (err) {
      return response.status(err.status).json({
        [err._message.key || 'error']: err._message.value || 'Unexpected error.',
      });
    }
  }
}