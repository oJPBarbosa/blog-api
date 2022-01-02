import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { UpdatePostRequestDTO } from './UpdatePostDTO';


export class UpdatePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: UpdatePostRequestDTO): Promise<void> {
    const post = await this.postsRepository.findById(data.post_id);

    if (!post) {
      throw new Error('Post not found.');
    }

    post.title = data.title;
    post.description = data.description;
    post.tags = data.tags; 
    post.content = data.content;
    post.updated_at = new Date();

    await this.postsRepository.save(post);
  }
}