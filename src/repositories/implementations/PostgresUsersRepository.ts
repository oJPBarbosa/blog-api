import { IUsersRepository } from '../IUsersRepository'
import { Repository, getRepository } from 'typeorm'
import { User } from '../../entities/User'

export class PostgresUsersRepository implements IUsersRepository {
  public async findByEmail(email: string): Promise<User | undefined> {
    const repository: Repository<User> = getRepository(User);
    const user = await repository.findOne({ where: { email } });

    return user;
  }

  public async save(user: User): Promise<void> {
    const repository: Repository<User> = getRepository(User);
    await repository.save(user);
  }
}