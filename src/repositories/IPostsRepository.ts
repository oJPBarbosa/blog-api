import { Post } from '../entities/Post'

export interface IPostsRepository {
  findById(post_id: string): Promise<Post | undefined>;
  findBySlug(language: string, slug: string): Promise<Post | undefined>;
  findAll(): Promise<Post[] | []>;
  save(post: Post): Promise<void>;
  destroy(post: Post): Promise<void>;
}