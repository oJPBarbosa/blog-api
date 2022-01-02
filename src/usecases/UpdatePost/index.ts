import { PostgresPostsRepository } from '../../repositories/implementations/PostgresPostsRepository'
import { IPostsRepository } from '../../repositories/IPostsRepository'
import { UpdatePostUseCase } from './UpdatePostUseCase'
import { UpdatePostController } from './UpdatePostController'

const postgresPostsRepository: IPostsRepository= new PostgresPostsRepository()

const updatePostUseCase: UpdatePostUseCase = new UpdatePostUseCase(
  postgresPostsRepository,
)

const updatePostController: UpdatePostController = new UpdatePostController(
  updatePostUseCase,
)

export { updatePostController }