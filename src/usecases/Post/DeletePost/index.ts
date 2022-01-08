import { PostgresPostsRepository } from '../../../repositories/implementations/PostgresPostsRepository'
import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { DeletePostUseCase } from './DeletePostUseCase'
import { DeletePostController } from './DeletePostController'

const postgresPostsRepository: IPostsRepository = new PostgresPostsRepository()
const postgresUsersRepository: IUsersRepository = new PostgresUsersRepository()

const deletePostUseCase: DeletePostUseCase = new DeletePostUseCase(
  postgresPostsRepository,
  postgresUsersRepository,
)

const deletePostController: DeletePostController = new DeletePostController(
  deletePostUseCase,
)

export { deletePostController }