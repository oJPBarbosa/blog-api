import { ShowCommentUseCase } from './ShowCommentUseCase';
import { Request, Response } from 'express';

export class ShowCommentController {
  constructor(private showCommentUseCase: ShowCommentUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { comment_id, post_id, slug, language } = request.query;

    try {
      if (comment_id) {
        const comment: object[] | object =
          await this.showCommentUseCase.execute({
            comment_id: comment_id.toString(),
          });

        return response.json(comment);
      }

      if (post_id) {
        const comment: object[] | object =
          await this.showCommentUseCase.execute({
            post_id: post_id.toString(),
          });

        return response.json(comment);
      }

      if (slug) {
        const comment: object[] | object =
          await this.showCommentUseCase.execute({
            slug: {
              language: language.toString(),
              slug: slug.toString(),
            },
          });

        return response.json(comment);
      }

      const comments: object[] | object = await this.showCommentUseCase.execute(
        {},
      );

      return response.json(comments);
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
