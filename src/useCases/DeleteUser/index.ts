import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { DeleteUserUseCase } from './DeleteUserUseCase'
import { DeleteUserController } from './DeleteUserController'

const postgresUsersRepository: IUsersRepository = new PostgresUsersRepository()

const deleteUserUseCase: DeleteUserUseCase = new DeleteUserUseCase(
  postgresUsersRepository,
)

const deleteUserController: DeleteUserController = new DeleteUserController(
  deleteUserUseCase,
)

export { deleteUserController }