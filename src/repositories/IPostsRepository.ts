import { Post } from '../entities/Post'

export interface IPostsRepository {
  findById(post_id: string): Promise<Post | undefined>;
  save(post: Post): Promise<void>;
  delete(post: Post): Promise<void>;
}