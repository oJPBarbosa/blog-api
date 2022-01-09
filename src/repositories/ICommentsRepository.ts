import { Comment } from '../entities/Comment'

export interface ICommentsRepository {
  findById(comment_id: string): Promise<Comment>;
  findByPostId(post_id: string): Promise<Comment[]>;
  findByPostSlug(language: string, slug: string): Promise<Comment[]>;
  findAll(): Promise<Comment[] | []>;
  save(comment: Comment): Promise<void>;
  destroy(comment: Comment): Promise<void>;
}