import { DownvotePostUseCase } from './DownvotePostUseCase'
import { Request, Response } from 'express'

export class DownvotePostController {
  constructor(
    private downvotePostUseCase: DownvotePostUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const post_id = request.params.id;

    try {
      await this.downvotePostUseCase.execute({ post_id });

      return response.json({ message: 'Post Downvoted.' });
    } catch (err) {
      return response.status((err.hasOwnProperty('status') ? err.status : 500)).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}