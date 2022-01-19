import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { NodemailerMailProvider } from '../../../providers/implementations/NodemailerMailProvider';
import { IMailProvider } from '../../../providers/IMailProvider';
import { JWTTokenProvider } from '../../../providers/implementations/JWTTokenProvider';
import { ITokenProvider } from '../../../providers/ITokenProvider';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController';

const postgresUsersRepository: IUsersRepository = new PostgresUsersRepository();
const nodemailerMailProvider: IMailProvider = new NodemailerMailProvider();
const JWTTokenProviderP: ITokenProvider = new JWTTokenProvider();

const createUserUseCase: CreateUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  nodemailerMailProvider,
  JWTTokenProviderP,
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
