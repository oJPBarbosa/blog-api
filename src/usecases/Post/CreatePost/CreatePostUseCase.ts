import { IPostsRepository } from '../../../repositories/IPostsRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { CreatePostRequestDTO } from './CreatePostDTO';
import { analyseDTO } from '../../../errors/DTOError';
import { User } from '../../../entities/User';
import { ExecuteError } from '../../../errors/ExecuteError';
import { Post } from '../../../entities/Post';
import { slugify } from '../../../utils/slugify';
import readingTime from 'reading-time';

export class CreatePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: CreatePostRequestDTO): Promise<Post> {
    try {
      analyseDTO(data);
    } catch (err) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: err.message,
        },
        status: 400,
      });
    }

    const { author_id, en, pt } = data;

    const user: User = await this.usersRepository.findById(author_id);

    if (!user) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: 'User not found.',
        },
        status: 404,
      });
    }

    const post: Post = new Post({
      author_id,
      slug_en: slugify(en.title),
      slug_pt: slugify(pt.title),
      title_en: en.title,
      title_pt: pt.title,
      description_en: en.description,
      description_pt: pt.description,
      tags_en: en.tags,
      tags_pt: pt.tags,
      reading_time_en: readingTime(en.content).text,
      reading_time_pt: readingTime(pt.content).text.replace(
        'read',
        'de leitura',
      ),
      content_en: en.content,
      content_pt: pt.content,
    });

    await this.postsRepository.save(post);

    return post;
  }
}
