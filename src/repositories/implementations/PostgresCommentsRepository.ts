import { ICommentsRepository } from '../ICommentsRepository'
import { Comment } from '../../entities/Comment'
import { Post } from '../../entities/Post'
import { Repository, getRepository } from 'typeorm'
import { PostgresPostsRepository } from './PostgresPostsRepository';

export class PostgresCommentsRepository implements ICommentsRepository {
  public async findById(comment_id: string): Promise<Comment> {
    const repository: Repository<Comment> = getRepository(Comment);
    const comment: Comment = await repository.findOne({
      where: {
        comment_id,
      }, 
    });

    return comment;
  }

  public async findByPostId(post_id: string): Promise<Comment[]> {
    const repository: Repository<Comment> = getRepository(Comment);
    const comments: Comment[] = await repository.find({
      where: {
        post_id,
      },
    });

    return comments;
  }

  public async findAll(): Promise<Comment[]> {
    const repository: Repository<Comment> = getRepository(Comment);
    const comments: Comment[] = await repository.find();

    return comments;
  }

  public async save(comment: Comment): Promise<void> {
    const repository: Repository<Comment> = getRepository(Comment);
    await repository.save(comment);
  }

  public async destroy(comment: Comment): Promise<void> {
    const repository: Repository<Comment> = getRepository(Comment);
    await repository.remove(comment);
  }
}