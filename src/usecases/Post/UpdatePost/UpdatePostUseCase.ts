import { IPostsRepository } from '../../../repositories/IPostsRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { IUpdatePostRequestDTO } from './UpdatePostDTO';
import { analyzeDTO } from '../../../errors/DTOError';
import { ExecuteError } from '../../../errors/ExecuteError';
import { User } from '../../../entities/User';
import { Post } from '../../../entities/Post';
import { slugify } from '../../../utils/slugify';
import readingTime from 'reading-time';

export class UpdatePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IUpdatePostRequestDTO): Promise<void> {
    const { source_user_id, target_post_id } = data;

    try {
      analyzeDTO({ target_post_id, source_user_id });
    } catch (err) {
      throw new ExecuteError({
        message: err.message,
        status: 400,
      });
    }

    const sourceUser: User = await this.usersRepository.findById(
      source_user_id,
    );
    const targetPost: Post = await this.postsRepository.findById(
      target_post_id,
    );

    if (!sourceUser || !targetPost) {
      throw new ExecuteError({
        message: `${sourceUser ? 'Target post' : 'Source user'} not found.`,
        status: 404,
      });
    }

    const { views, en, pt } = data;

    if (sourceUser.user_id === targetPost?.author_id || sourceUser.root) {
      targetPost.views = views;
      targetPost.slug_en = slugify(
        en?.hasOwnProperty('title') ? en.title : targetPost.title_en,
      );
      targetPost.slug_pt = slugify(
        pt?.hasOwnProperty('title') ? pt.title : targetPost.title_pt,
      );
      targetPost.title_en = en?.hasOwnProperty('title')
        ? en.title
        : targetPost.title_en;
      targetPost.title_pt = pt?.hasOwnProperty('title')
        ? pt.title
        : targetPost.title_pt;
      targetPost.description_en = en?.hasOwnProperty('description')
        ? en.title
        : targetPost.title_en;
      targetPost.description_pt = pt?.hasOwnProperty('description')
        ? pt.description
        : targetPost.description_pt;
      targetPost.tags_en = en?.hasOwnProperty('tags')
        ? en.tags
        : targetPost.tags_en;
      targetPost.tags_pt = pt?.hasOwnProperty('tags')
        ? pt.tags
        : targetPost.tags_pt;
      targetPost.reading_time_en = readingTime(
        en?.content ? en?.content : targetPost.content_en,
      ).text;
      targetPost.reading_time_pt = readingTime(
        pt?.content ? pt?.content : targetPost.content_pt,
      ).text.replace('read', 'de leitura');
      targetPost.content_en = en?.hasOwnProperty('content')
        ? en.content
        : targetPost.content_en;
      targetPost.content_pt = pt?.hasOwnProperty('content')
        ? pt.content
        : targetPost.content_pt;
    }

    await this.postsRepository.save(targetPost);
  }
}
