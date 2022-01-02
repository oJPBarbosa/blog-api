import { PostgresPostsRepository } from '../../../repositories/implementations/PostgresPostsRepository'
import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { ShowPostUseCase } from './ShowPostUseCase'
import { ShowPostController } from './ShowPostController'

const postgresPostsRepository: IPostsRepository = new PostgresPostsRepository()

const showPostUseCase: ShowPostUseCase = new ShowPostUseCase(
  postgresPostsRepository,
)

const showPostController: ShowPostController = new ShowPostController(
  showPostUseCase,
)

export { showPostController }