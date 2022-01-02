import { PostgresPostsRepository } from '../../../repositories/implementations/PostgresPostsRepository'
import { IPostsRepository } from '../../../repositories/IPostsRepository'
import { DeletePostUseCase } from './DeletePostUseCase'
import { DeletePostController } from './DeletePostController'

const postgresPostsRepository: IPostsRepository = new PostgresPostsRepository()

const deletePostUseCase: DeletePostUseCase = new DeletePostUseCase(
  postgresPostsRepository,
)

const deletePostController: DeletePostController = new DeletePostController(
  deletePostUseCase,
)

export { deletePostController }