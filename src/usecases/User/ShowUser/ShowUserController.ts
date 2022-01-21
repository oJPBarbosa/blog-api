import { ShowUserUseCase } from './ShowUserUseCase';
import { Response, Request } from 'express';

export class ShowUserController {
  constructor(private showUserUseCase: ShowUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id, verified, authorized } = request.query;

    try {
      if (id) {
        const user: object = (await this.showUserUseCase.execute({
          user_id: id.toString(),
        })) as object;

        return response.json(user);
      }

      if (verified || authorized) {
        const users: object[] = (await this.showUserUseCase.execute({
          verified: verified?.toString() === 'true',
          authorized: authorized?.toString() === 'true',
        })) as object[];

        return response.json(users);
      }

      const users: object[] = (await this.showUserUseCase.execute({
        all: true,
      })) as object[];

      return response.json(users);
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
