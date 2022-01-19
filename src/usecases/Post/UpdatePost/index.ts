import { PostgresPostsRepository } from '../../../repositories/implementations/PostgresPostsRepository';
import { IPostsRepository } from '../../../repositories/IPostsRepository';
import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { UpdatePostUseCase } from './UpdatePostUseCase';
import { UpdatePostController } from './UpdatePostController';

const postgresPostsRepository: IPostsRepository = new PostgresPostsRepository();
const postgresUsersRepository: IUsersRepository = new PostgresUsersRepository();

const updatePostUseCase: UpdatePostUseCase = new UpdatePostUseCase(
  postgresPostsRepository,
  postgresUsersRepository,
);

const updatePostController: UpdatePostController = new UpdatePostController(
  updatePostUseCase,
);

export { updatePostController };
