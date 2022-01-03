import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { NodemailerMailProvider } from '../../../providers/implementations/NodemailerMailProvider'
import { IMailProvider } from '../../../providers/IMailProvider'
import { CreateUserUseCase } from './CreateUserUseCase'
import { CreateUserController } from './CreateUserController'

const postgresUsersRepository: IUsersRepository  = new PostgresUsersRepository()
const nodemailerMailProvider: IMailProvider = new NodemailerMailProvider()

const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  nodemailerMailProvider,
)

const createUserController = new CreateUserController(
  createUserUseCase,
)

export { createUserController }
