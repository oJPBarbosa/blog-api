import { IPostsRepository } from '../IPostsRepository'
import { Post } from '../../entities/Post'
import { Repository, getRepository } from 'typeorm'

export class PostgresPostsRepository implements IPostsRepository {
  public async findById(post_id: string): Promise<Post | undefined> {
    const repository: Repository<Post> = getRepository(Post);
    const post: Post = await repository.findOne({
      where: {
        post_id,
      }, 
      relations: [
        'author',
      ],
    });

    return post;
  }

  public async findBySlug(language: string, slug: string): Promise<Post> {
    const repository: Repository<Post> = getRepository(Post);
    const post: Post = await repository.findOne({
      where: {
        [`slug_${language}`]: slug,
      },
      relations: [
        'author',
      ],
    });

    return post;
  }

  public async findAll(): Promise<Post[] | undefined> {
    const repository: Repository<Post> = getRepository(Post);
    const posts: Post[] = await repository.find({
      relations: [
        'author',
      ],
    });

    return posts;
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