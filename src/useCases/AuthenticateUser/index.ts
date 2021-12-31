import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { AuthenticateUserController } from './AuthenticateUserController'

const postgresUsersRepository: IUsersRepository  = new PostgresUsersRepository()

const authenticateUserUseCase: AuthenticateUserUseCase = new AuthenticateUserUseCase(
  postgresUsersRepository
)

const authenticateUserController: AuthenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
)

export { authenticateUserController }