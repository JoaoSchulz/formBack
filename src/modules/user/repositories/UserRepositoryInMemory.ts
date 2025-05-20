import { User } from '../entities/user';
import { UserRepository } from './UserRepository';

export class UserRepositoryInMemory implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user); // Certifique-se de que o usuário inclui o campo role
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email); // O usuário retornado já deve incluir o campo role
  }

  async findAll(): Promise<User[]> {
    return this.users; // Certifique-se de que todos os usuários incluem o campo role
  }
}