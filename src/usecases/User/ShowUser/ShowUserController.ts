import { ShowUserUseCase } from './ShowUserUseCase';
import { Response, Request } from 'express'

export class ShowUserController {
  constructor(
    private showUserUseCase: ShowUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id, authorized } = request.query;

    try {
      if (id) {
        const user = await this.showUserUseCase.execute({ user_id: id.toString() });

        return response.json(user);
      }

      if (authorized) {
        const users = await this.showUserUseCase.execute({
          authorized: authorized.toString() === 'true' ? true : false,
        });

        return response.json(users);
      }

      const users = await this.showUserUseCase.execute({});

      return response.json(users);
    } catch (err) {
      return response.status((err.hasOwnProperty('status') ? err.status : 500)).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}