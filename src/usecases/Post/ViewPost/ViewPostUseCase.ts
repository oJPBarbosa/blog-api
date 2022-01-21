import { IPostsRepository } from '../../../repositories/IPostsRepository';
import { IViewPostRequestDTO } from './ViewPostDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { ExecuteError } from '../../../errors/ExecuteError';
import { Post } from '../../../entities/Post';

export class ViewPostUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(data: IViewPostRequestDTO): Promise<number> {
    try {
      analyzeDTO(data);
    } catch (err) {
      throw new ExecuteError({
        message: err.message,
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
        message: 'Post not found.',
        status: 404,
      });
    }

    post.views++;

    await this.postsRepository.save(post);

    return post.views;
  }
}
