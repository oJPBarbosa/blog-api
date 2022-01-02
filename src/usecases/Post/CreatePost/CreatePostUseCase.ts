import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { CreatePostRequestDTO } from './CreatePostDTO'
import { Post } from '../../../entities/Post'

export class CreatePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
  ) {}

  async execute(data: CreatePostRequestDTO): Promise<Post> {
    const { author_id, title, description, tags, content } = data;

    const post = new Post({
      author_id,
      title,
      description,
      tags,
      content,
    });

    await this.postsRepository.save(post);

    return post;
  }
}