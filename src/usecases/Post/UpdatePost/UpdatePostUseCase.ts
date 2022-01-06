import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { UpdatePostRequestDTO } from './UpdatePostDTO';
import { analyseDTO } from '../../../errors/DTOError';
import { ExecuteError } from '../../../errors/ExecuteError'

export class UpdatePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: UpdatePostRequestDTO): Promise<void> {
    try {
      analyseDTO([ 'post_id' ]);
    } catch (err) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: err.message,
        },
        status: 400,
      });
    }

    const { post_id, en, pt, votes } = data;

    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Post not found.',
        },
        status: 404,
      });
    }

    post.title_en = en?.title;
    post.title_pt = pt?.title;
    post.description_en = en?.description;
    post.description_pt = pt?.description;
    post.tags_en = en?.tags;
    post.tags_pt = pt?.tags;
    post.content_en = en?.content;
    post.content_pt = pt?.content;
    post.votes = votes;
    post.updated_at = new Date();

    await this.postsRepository.save(post);
  }
}