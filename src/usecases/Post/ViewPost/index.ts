import { PostgresPostsRepository } from '../../../repositories/implementations/PostgresPostsRepository'
import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { ViewPostUseCase } from './ViewPostUseCase'
import { ViewPostController } from './ViewPostController'

const postgresPostsRepository: IPostsRepository = new PostgresPostsRepository()

const viewPostUseCase: ViewPostUseCase = new ViewPostUseCase(
  postgresPostsRepository,
)

const viewPostController: ViewPostController = new ViewPostController(
  viewPostUseCase,
)

export { viewPostController }