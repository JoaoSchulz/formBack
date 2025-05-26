import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | undefined>;
  abstract findAll(): Promise<User[]>;
  abstract updateUser(id: number, data: Partial<User>): Promise<void>;
  abstract deleteUser(id: number): Promise<void>;
}