import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { JWTTokenProvider } from '../../../providers/implementations/JWTTokenProvider';
import { ITokenProvider } from '../../../providers/ITokenProvider';
import { ResetUserPasswordUseCase } from './ResetUserPasswordUseCase';
import { ResetUserPasswordController } from './ResetUserPasswordController';

const postgresUsersRepository: IUsersRepository = new PostgresUsersRepository();
const JWTTokenProviderP: ITokenProvider = new JWTTokenProvider();

const resetUserPasswordUseCase: ResetUserPasswordUseCase =
  new ResetUserPasswordUseCase(postgresUsersRepository, JWTTokenProviderP);

const resetUserPasswordController = new ResetUserPasswordController(
  resetUserPasswordUseCase,
);

export { resetUserPasswordController };
