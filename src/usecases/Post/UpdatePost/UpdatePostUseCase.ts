import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { UpdatePostRequestDTO } from './UpdatePostDTO'
import { analyseDTO } from '../../../errors/DTOError'
import { ExecuteError } from '../../../errors/ExecuteError'

export class UpdatePostUseCase {
  constructor(
    private postsRepository: IPostsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: UpdatePostRequestDTO): Promise<void> {
    try {
      analyseDTO([ 'post_id', 'sourceUser_id' ]);
    } catch (err) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: err.message,
        },
        status: 400,
      });
    }

    const { source_user_id, post_id, en, pt } = data;

    const sourceUser = await this.usersRepository.findById(source_user_id);
    const post = await this.postsRepository.findById(post_id);

    if (!sourceUser || !post) {
      throw new ExecuteError({
        _message: {
          key: 'error',
          value: `${sourceUser ? 'Post' : 'Source user'} not found.`,
        },
        status: 404,
      });
    }

    if (sourceUser.user_id === post.author_id) {
      post.title_en = en?.title;
      post.title_pt = pt?.title;
      post.description_en = en?.description;
      post.description_pt = pt?.description;
      post.tags_en = en?.tags;
      post.tags_pt = pt?.tags;
      post.content_en = en?.content;
      post.content_pt = pt?.content;
      post.updated_at = new Date();
    }

    await this.postsRepository.save(post);
  }
}