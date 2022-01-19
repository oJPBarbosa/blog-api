import { IUsersRepository } from '../IUsersRepository';
import { User } from '../../entities/User';
import { Repository, getRepository } from 'typeorm';

export class PostgresUsersRepository implements IUsersRepository {
  public async findById(user_id: string): Promise<User> {
    const repository: Repository<User> = getRepository(User);
    const user = await repository.findOne({ where: { user_id } });

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const repository: Repository<User> = getRepository(User);
    const user: User = await repository.findOne({ where: { email } });

    return user;
  }

  public async findAll(): Promise<User[] | []> {
    const repository: Repository<User> = getRepository(User);
    const users: User[] = await repository.find();

    return users;
  }

  public async save(user: User): Promise<void> {
    const repository: Repository<User> = getRepository(User);
    await repository.save(user);
  }

  public async destroy(user: User): Promise<void> {
    const repository: Repository<User> = getRepository(User);
    await repository.remove(user);
  }
}
