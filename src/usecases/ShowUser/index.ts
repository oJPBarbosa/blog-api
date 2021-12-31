import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ShowUserUseCase } from './ShowUserUseCase'
import { ShowUserController } from './ShowUserController'

const postgresUsersRepository: IUsersRepository = new PostgresUsersRepository()

const showUserUseCase: ShowUserUseCase = new ShowUserUseCase(
  postgresUsersRepository,
)

const showUserController: ShowUserController = new ShowUserController(
  showUserUseCase,
)

export { showUserController }