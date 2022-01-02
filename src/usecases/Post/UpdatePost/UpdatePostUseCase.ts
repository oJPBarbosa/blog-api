import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { UpdatePostRequestDTO } from './UpdatePostDTO';
import { ExecuteError } from '../../../exceptions/ExecuteError'


export class UpdatePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: UpdatePostRequestDTO): Promise<void> {
    const post = await this.postsRepository.findById(data.post_id);

    if (!post) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'Post not found.',
        },
        status: 404,
      });
    }

    post.title = data.title;
    post.description = data.description;
    post.tags = data.tags; 
    post.content = data.content;
    post.updated_at = new Date();

    await this.postsRepository.save(post);
  }
}