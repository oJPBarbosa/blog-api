import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { NodemailerMailProvider } from '../../../providers/implementations/NodemailerMailProvider'
import { IMailProvider } from '../../../providers/IMailProvider'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { AuthenticateUserController } from './AuthenticateUserController'

const postgresUsersRepository: IUsersRepository  = new PostgresUsersRepository()
const nodemailerMailProvider: IMailProvider = new NodemailerMailProvider()

const authenticateUserUseCase: AuthenticateUserUseCase = new AuthenticateUserUseCase(
  postgresUsersRepository,
  nodemailerMailProvider,
)

const authenticateUserController: AuthenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase,
)

export { authenticateUserController }