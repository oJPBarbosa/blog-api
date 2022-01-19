import { PostgresUsersRepository } from '../../../repositories/implementations/PostgresUsersRepository';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { UpdateUserUseCase } from './UpdateUserUseCase';
import { UpdateUserController } from './UpdateUserController';

const postgresUsersRepository: IUsersRepository = new PostgresUsersRepository();

const updateUserUseCase: UpdateUserUseCase = new UpdateUserUseCase(
  postgresUsersRepository,
);

const updateUserController: UpdateUserController = new UpdateUserController(
  updateUserUseCase,
);

export { updateUserController };
