import { PostgresPostsRepository } from '../../repositories/implementations/PostgresPostsRepository'
import { IPostsRepository } from '../../repositories/IPostsRepository'
import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ShowPostUseCase } from './ShowPostUseCase'
import { ShowPostController } from './ShowPostController'

const postgresPostsRepository: IPostsRepository = new PostgresPostsRepository()
const postgresUsersRepository: IUsersRepository = new PostgresUsersRepository()

const showPostUseCase: ShowPostUseCase = new ShowPostUseCase(
  postgresPostsRepository,
  postgresUsersRepository,
)

const showPostController: ShowPostController = new ShowPostController(
  showPostUseCase,
)

export { showPostController }