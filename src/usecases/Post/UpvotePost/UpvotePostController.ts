import { UpvotePostUseCase } from './UpvotePostUseCase'
import { Request, Response } from 'express'

export class UpvotePostController {
  constructor(
    private upvotePostUseCase: UpvotePostUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const post_id = request.params.id;

    try {
      await this.upvotePostUseCase.execute({ post_id });

      return response.json({ message: 'Post upvoted.' });
    } catch (err) {
      return response.status((err.hasOwnProperty('status') ? err.status : 500)).json({
        [err._message?.key || 'error']: err._message?.value || 'Unexpected error.',
      });
    }
  }
}