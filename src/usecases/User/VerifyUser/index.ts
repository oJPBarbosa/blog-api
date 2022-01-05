import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { VerifyUserUseCase } from './VerifyUserUseCase'
import { VerifyUserController } from './VerifyUserController'

const postgresUsersRepository: IUsersRepository = new PostgresUsersRepository()

const verifyUserUseCase: VerifyUserUseCase = new VerifyUserUseCase(
  postgresUsersRepository,
)

const verifyUserController: VerifyUserController = new VerifyUserController(
  verifyUserUseCase,
)

export { verifyUserController }