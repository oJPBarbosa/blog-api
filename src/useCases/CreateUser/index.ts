import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { MailtrapMailProvider } from '../../providers/implementations/MailtrapMailProvider'
import { IMailProvider } from '../../providers/IMailProvider'
import { CreateUserUseCase } from './CreateUserUseCase'
import { CreateUserController } from './CreateUserController'

const postgresUsersRepository: IUsersRepository  = new PostgresUsersRepository()
const mailtrapMailProvider: IMailProvider = new MailtrapMailProvider()

const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  mailtrapMailProvider,
)

const createUserController = new CreateUserController(
  createUserUseCase,
)

export { createUserController }
