import { PostgresPostsRepository } from '../../../repositories/implementations/PostgresPostsRepository';
import { IPostsRepository } from '../../../repositories/IPostsRepository';
import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { CreatePostUseCase } from './CreatePostUseCase';
import { CreatePostController } from './CreatePostController';

const postgresPostsRepository: IPostsRepository = new PostgresPostsRepository();
const postgresUsersRepository: IUsersRepository = new PostgresUsersRepository();

const createPostUseCase: CreatePostUseCase = new CreatePostUseCase(
  postgresPostsRepository,
  postgresUsersRepository,
);

const createPostController: CreatePostController = new CreatePostController(
  createPostUseCase,
);

export { createPostController };
