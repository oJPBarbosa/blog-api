import { IPostsRepository } from '../../../repositories/IPostsRepository';
import { IViewPostRequestDTO } from './ViewPostDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { Post } from '../../../entities/Post';
import { ExecuteError } from '../../../errors/ExecuteError';

export class ViewPostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(data: IViewPostRequestDTO): Promise<number> {
    try {
      analyzeDTO(data);
    } catch (err) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: err.message,
        },
        status: 400,
      });
    }

    const { slug } = data;

    const post: Post = await this.postsRepository.findBySlug(
      slug.language,
      slug.slug,
    );

    if (!post) {
      throw new ExecuteError({
        status: 404,
        _message: {
          key: 'error',
          value: 'Post not found.',
        },
      });
    }

    post.views++;

    await this.postsRepository.save(post);

    return post.views;
  }
}
