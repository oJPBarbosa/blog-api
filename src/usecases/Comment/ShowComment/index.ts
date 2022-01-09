import { PostgresCommentsRepository } from '../../../repositories/implementations/PostgresCommentsRepository'
import { ICommentsRepository } from '../../../repositories/ICommentsRepository'
import { PostgresPostsRepository } from '../../../repositories/implementations/PostgresPostsRepository'
import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { ShowCommentUseCase } from './ShowCommentUseCase'
import { ShowCommentController } from './ShowCommentController'

const postgresCommentsRepository: ICommentsRepository = new PostgresCommentsRepository()
const postgresPostsRepository: IPostsRepository = new PostgresPostsRepository()

const showCommentUseCase: ShowCommentUseCase = new ShowCommentUseCase(
  postgresCommentsRepository,
  postgresPostsRepository,
)

const showCommentController: ShowCommentController = new ShowCommentController(
  showCommentUseCase,
)

export { showCommentController }