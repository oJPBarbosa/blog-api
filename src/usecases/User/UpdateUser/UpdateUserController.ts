import { UpdateUserUseCase } from './UpdateUserUseCase';
import { Request, Response } from 'express';

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const target_user_id: string = request.params.id;
      const {
        source_user_id,
        name,
        email,
        password,
        avatar,
        biography,
        authorized,
        verified,
        root,
      } = request.body;

      await this.updateUserUseCase.execute({
        source_user_id,
        target_user_id,
        name,
        email,
        password,
        avatar,
        biography,
        authorized,
        verified,
        root,
      });

      return response.json({ message: 'User updated.' });
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
