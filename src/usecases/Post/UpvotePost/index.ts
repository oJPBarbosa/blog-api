import { PostgresPostsRepository } from '../../../repositories/implementations/PostgresPostsRepository'
import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { UpvotePostUseCase } from './UpvotePostUseCase'
import { UpvotePostController } from './UpvotePostController'

const postgresPostsRepository: IPostsRepository = new PostgresPostsRepository()

const upvotePostUseCase: UpvotePostUseCase = new UpvotePostUseCase(
  postgresPostsRepository,
)

const upvotePostController: UpvotePostController = new UpvotePostController(
  upvotePostUseCase,
)

export { upvotePostController }