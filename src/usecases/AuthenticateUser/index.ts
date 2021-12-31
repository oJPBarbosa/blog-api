import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { JWTTokenProvider } from '../../providers/implementations/JWTTokenProvider'
import { ITokenProvider } from '../../providers/ITokenProvider'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { AuthenticateUserController } from './AuthenticateUserController'

const postgresUsersRepository: IUsersRepository  = new PostgresUsersRepository()
const JWTTokenProviderP: ITokenProvider = new JWTTokenProvider()

const authenticateUserUseCase: AuthenticateUserUseCase = new AuthenticateUserUseCase(
  postgresUsersRepository,
  JWTTokenProviderP,
)

const authenticateUserController: AuthenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase,
)

export { authenticateUserController }