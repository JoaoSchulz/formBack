import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '../entities/user';
import { UserRepository } from './UserRepository';

@Injectable()
export class UserRepositoryPrisma implements UserRepository {
  private prisma = new PrismaClient();

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        createdAt: user.createdAt,
        role: user.role as 'admin' | 'user', // Certifique-se de que o campo role está incluído
      },
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return undefined;
    return new User({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      role: user.role as 'admin' | 'user',
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(
      user =>
        new User({
          id: user.id,
          email: user.email,
          name: user.name,
          password: user.password,
          createdAt: user.createdAt,
          role: user.role as 'admin' | 'user', 
        }),
    );
  }
}
