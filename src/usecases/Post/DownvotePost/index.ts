import { PostgresPostsRepository } from '../../../repositories/implementations/PostgresPostsRepository'
import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { DownvotePostUseCase } from './DownvotePostUseCase'
import { DownvotePostController } from './DownvotePostController'

const postgresPostsRepository: IPostsRepository = new PostgresPostsRepository()

const downvotePostUseCase: DownvotePostUseCase = new DownvotePostUseCase(
  postgresPostsRepository,
)

const downvotePostController: DownvotePostController = new DownvotePostController(
  downvotePostUseCase,
)

export { downvotePostController }