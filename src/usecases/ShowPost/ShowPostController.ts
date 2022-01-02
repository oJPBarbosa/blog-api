import { ShowPostUseCase } from './ShowPostUseCase'
import { Request, Response } from 'express'

export class ShowPostController {
  constructor(
    private showPostUseCase: ShowPostUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const post_id: string = request.params.id;

    try {
      const { post, user } = await this.showPostUseCase.execute({ post_id });

      return response.status(200).json({ 
        title: post.title,
        description: post.description,
        tags: post.tags,
        content: post.content,
        created_at: post.created_at,
        author: {
          name: user.name,
          avatar: user.avatar,
        },
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}