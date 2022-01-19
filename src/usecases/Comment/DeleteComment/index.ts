import { PostgresCommentsRepository } from '../../../repositories/implementations/PostgresCommentsRepository';
import { ICommentsRepository } from '../../../repositories/ICommentsRepository';
import { PostgresPostsRepository } from '../../../repositories/implementations/PostgresPostsRepository';
import { IPostsRepository } from '../../../repositories/IPostsRepository';
import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { NodemailerMailProvider } from '../../../providers/implementations/NodemailerMailProvider';
import { IMailProvider } from '../../../providers/IMailProvider';
import { DeleteCommentUseCase } from './DeleteCommentUseCase';
import { DeleteCommentController } from './DeleteCommentController';

const postgresCommentsRepository: ICommentsRepository =
  new PostgresCommentsRepository();
const postgresPostsRepository: IPostsRepository = new PostgresPostsRepository();
const postgresUsersRepository: IUsersRepository = new PostgresUsersRepository();
const nodemailerMailProvider: IMailProvider = new NodemailerMailProvider();

const deleteCommentUseCase: DeleteCommentUseCase = new DeleteCommentUseCase(
  postgresCommentsRepository,
  postgresPostsRepository,
  postgresUsersRepository,
  nodemailerMailProvider,
);

const deleteCommentController: DeleteCommentController =
  new DeleteCommentController(deleteCommentUseCase);

export { deleteCommentController };
