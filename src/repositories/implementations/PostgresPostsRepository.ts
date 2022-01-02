import { IPostsRepository } from '../IPostsRepository'
import { Post } from '../../entities/Post'
import { Repository, getRepository } from 'typeorm'

export class PostgresPostsRepository implements IPostsRepository {
  public async findById(post_id: string): Promise<Post | undefined> {
    const repository: Repository<Post> = getRepository(Post);
    const post = await repository.findOne({ where: { post_id } });

    return post;
  }

  public async save(post: Post): Promise<void> {
    const repository: Repository<Post> = getRepository(Post);
    await repository.save(post);
  }

  public async destroy(post: Post): Promise<void> {
    const repository: Repository<Post> = getRepository(Post);
    await repository.remove(post);
  }
}