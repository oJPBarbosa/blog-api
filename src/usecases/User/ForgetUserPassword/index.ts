import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { NodemailerMailProvider } from '../../../providers/implementations/NodemailerMailProvider';
import { IMailProvider } from '../../../providers/IMailProvider';
import { JWTTokenProvider } from '../../../providers/implementations/JWTTokenProvider';
import { ITokenProvider } from '../../../providers/ITokenProvider';
import { ForgetUserPasswordUseCase } from './ForgetUserPasswordUseCase';
import { ForgetUserPasswordController } from './ForgetUserPasswordController';

const postgresUsersRepository: IUsersRepository = new PostgresUsersRepository();
const nodemailerMailProvider: IMailProvider = new NodemailerMailProvider();
const JWTTokenProviderP: ITokenProvider = new JWTTokenProvider();

const forgetUserPasswordUseCase: ForgetUserPasswordUseCase =
  new ForgetUserPasswordUseCase(
    postgresUsersRepository,
    nodemailerMailProvider,
    JWTTokenProviderP,
  );

const forgetUserPasswordController = new ForgetUserPasswordController(
  forgetUserPasswordUseCase,
);

export { forgetUserPasswordController };
