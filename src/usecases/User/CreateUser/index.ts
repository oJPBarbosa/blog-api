import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { NodemailerMailProvider } from '../../../providers/implementations/NodemailerMailProvider'
import { IMailProvider } from '../../../providers/IMailProvider'
import { CreateUserUseCase } from './CreateUserUseCase'
import { CreateUserController } from './CreateUserController'
import { JWTTokenProvider } from '../../../providers/implementations/JWTTokenProvider'
import { ITokenProvider } from '../../../providers/ITokenProvider'

const postgresUsersRepository: IUsersRepository  = new PostgresUsersRepository()
const nodemailerMailProvider: IMailProvider = new NodemailerMailProvider()
const _JWTTokenProvider: ITokenProvider = new JWTTokenProvider()

const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  nodemailerMailProvider,
  _JWTTokenProvider,
)

const createUserController = new CreateUserController(
  createUserUseCase,
)

export { createUserController }
