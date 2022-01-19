import { CreatePostUseCase } from './CreatePostUseCase';
import { Request, Response } from 'express';
import { Post } from '../../../entities/Post';

export class CreatePostController {
  constructor(private createPostUseCase: CreatePostUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { author_id, en, pt } = request.body;

    try {
      const post: Post = await this.createPostUseCase.execute({
        author_id,
        en,
        pt,
      });

      return response.status(201).json({ id: post.post_id });
    } catch (err) {
      return response
        .status(err.hasOwnProperty('status') ? err.status : 500)
        .json({
          [err._message?.key || 'error']:
            err._message?.value || 'Unexpected error.',
        });
    }
  }
}
