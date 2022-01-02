import { User } from '../entities/User'

export interface IUsersRepository {
  findById(user_id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<void>;
  destroy(user: User): Promise<void>;
}