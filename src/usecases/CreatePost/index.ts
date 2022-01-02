import { PostgresPostsRepository } from '../../repositories/implementations/PostgresPostsRepository'
import { IPostsRepository } from '../../repositories/IPostsRepository'
import { CreatePostUseCase } from './CreatePostUseCase'
import { CreatePostController } from './CreatePostController'

const postgresPostsRepository: IPostsRepository = new PostgresPostsRepository()

const createPostUseCase: CreatePostUseCase = new CreatePostUseCase(
  postgresPostsRepository,
)

const createPostController: CreatePostController = new CreatePostController(
  createPostUseCase,
)

export { createPostController }
