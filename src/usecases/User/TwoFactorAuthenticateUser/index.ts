import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { JWTTokenProvider } from '../../../providers/implementations/JWTTokenProvider'
import { ITokenProvider } from '../../../providers/ITokenProvider'
import { TwoFactorAuthenticateUserUseCase } from './TwoFactorAuthenticateUserUseCase'
import { TwoFactorAuthenticateUserController } from './TwoFactorAuthenticateUserController'

const postgresUsersRepository: IUsersRepository = new PostgresUsersRepository()
const JWTTokenProviderP: ITokenProvider = new JWTTokenProvider()

const twoFactorAuthenticateUserUseCase: TwoFactorAuthenticateUserUseCase = new TwoFactorAuthenticateUserUseCase(
  postgresUsersRepository,
  JWTTokenProviderP,
)

const twoFactorAuthenticateUserController: TwoFactorAuthenticateUserController = new TwoFactorAuthenticateUserController(
  twoFactorAuthenticateUserUseCase,
)

export { twoFactorAuthenticateUserController }
