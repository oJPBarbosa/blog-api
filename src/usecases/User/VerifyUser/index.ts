import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { NodemailerMailProvider } from '../../../providers/implementations/NodemailerMailProvider'
import { IMailProvider } from '../../../providers/IMailProvider'
import { VerifyUserUseCase } from './VerifyUserUseCase'
import { VerifyUserController } from './VerifyUserController'

const postgresUsersRepository: IUsersRepository = new PostgresUsersRepository()
const nodemailerMailProvider: IMailProvider = new NodemailerMailProvider()

const verifyUserUseCase: VerifyUserUseCase = new VerifyUserUseCase(
  postgresUsersRepository,
  nodemailerMailProvider,
)

const verifyUserController: VerifyUserController = new VerifyUserController(
  verifyUserUseCase,
)

export { verifyUserController }