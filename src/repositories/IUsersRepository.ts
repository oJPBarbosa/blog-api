import { User } from '../entities/User'

export interface IUsersRepository {
  findById(user_id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<User[] | []>;
  save(user: User): Promise<void>;
  destroy(user: User): Promise<void>;
}