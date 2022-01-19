import { Post } from '../entities/Post';

export interface IPostsRepository {
  findById(post_id: string): Promise<Post>;
  findBySlug(language: string, slug: string): Promise<Post>;
  findAll(): Promise<Post[] | []>;
  save(post: Post): Promise<void>;
  destroy(post: Post): Promise<void>;
}
