import { User } from '../entities/User'

export interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<void>;
  delete(user: User): Promise<void>;
}