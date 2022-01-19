import { PostgresCommentsRepository } from '../../../repositories/implementations/PostgresCommentsRepository';
import { ICommentsRepository } from '../../../repositories/ICommentsRepository';
import { PostgresPostsRepository } from '../../../repositories/implementations/PostgresPostsRepository';
import { IPostsRepository } from '../../../repositories/IPostsRepository';
import { CreateCommentUseCase } from './CreateCommentUseCase';
import { CreateCommentController } from './CreateCommentController';

const postgresCommentsRepository: ICommentsRepository =
  new PostgresCommentsRepository();
const postgresPostsRepository: IPostsRepository = new PostgresPostsRepository();

const createCommentUseCase: CreateCommentUseCase = new CreateCommentUseCase(
  postgresCommentsRepository,
  postgresPostsRepository,
);

const createCommentController: CreateCommentController =
  new CreateCommentController(createCommentUseCase);

export { createCommentController };
