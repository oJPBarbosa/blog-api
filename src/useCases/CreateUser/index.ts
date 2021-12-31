import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { MailtrapMailProvider } from '../../providers/implementations/MailtrapMailProvider'
import { IMailProvider } from '../../providers/IMailProvider'
import { CreateUserUseCase } from './CreateUserUseCase'
import { CreateUserController } from './CreateUserController'
import { JWTTokenProvider } from '../../providers/implementations/JWTTokenProvider'
import { ITokenProvider } from '../../providers/ITokenProvider'

const postgresUsersRepository: IUsersRepository  = new PostgresUsersRepository()
const mailtrapMailProvider: IMailProvider = new MailtrapMailProvider()
const JWTTokenProviderP: ITokenProvider = new JWTTokenProvider()

const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  mailtrapMailProvider,
  JWTTokenProviderP,
)

const createUserController = new CreateUserController(
  createUserUseCase,
)

export { createUserController }
