import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { UpdatePostRequestDTO } from './UpdatePostDTO'
import { analyseDTO } from '../../../errors/DTOError'
import { ExecuteError } from '../../../errors/ExecuteError'
import { slugify } from '../../../utils/slugify'
import readingTime from 'reading-time'

export class UpdatePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: UpdatePostRequestDTO): Promise<void> {
    const { source_user_id, target_post_id } = data;

    try {
      analyseDTO({ target_post_id, source_user_id });
    } catch (err) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: err.message,
        },
        status: 400,
      });
    }

    const sourceUser = await this.usersRepository.findById(source_user_id);
    const targetPost = await this.postsRepository.findById(target_post_id);

    if (!sourceUser || !targetPost) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: `${sourceUser ? 'targetPost' : 'Source user'} not found.`,
        },
        status: 404,
      });
    }

    const { en, pt } = data;

    if (sourceUser.user_id === targetPost.author_id || sourceUser.root) {
      targetPost.slug_en =
        slugify(en?.hasOwnProperty('title') ? en.title : targetPost.title_en);
      targetPost.slug_pt =
        slugify(pt?.hasOwnProperty('title') ? pt.title : targetPost.title_pt);
      targetPost.title_en =
        en?.hasOwnProperty('title') ? en.title : targetPost.title_en;
      targetPost.title_pt =
        pt?.hasOwnProperty('title') ? pt.title : targetPost.title_pt;
      targetPost.description_en =
        en?.hasOwnProperty('description') ? en.title : targetPost.title_en;
      targetPost.description_pt =
        pt?.hasOwnProperty('description') ? pt.description : targetPost.description_pt;
      targetPost.tags_en =
        en?.hasOwnProperty('tags') ? en.tags : targetPost.tags_en;
      targetPost.tags_pt =
        pt?.hasOwnProperty('tags') ? pt.tags : targetPost.tags_pt;
      targetPost.reading_time_en =
        readingTime(en?.content ? en?.content : targetPost.content_en).text;
      targetPost.reading_time_pt =
        readingTime(pt?.content ? pt?.content : targetPost.content_pt).text
        .replace('read', 'de leitura');
      targetPost.content_en =
        en?.hasOwnProperty('content') ? en.content : targetPost.content_en;
      targetPost.content_pt =
        pt?.hasOwnProperty('content') ? pt.content : targetPost.content_pt;
      targetPost.updated_at = new Date();
    }

    await this.postsRepository.save(targetPost);
  }
}