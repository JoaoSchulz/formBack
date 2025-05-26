import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '../entities/user';
import { UserRepository } from './UserRepository';
import { hash } from 'bcrypt';

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
        role: user.role as 'admin' | 'user',
      },
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
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
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
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

  async updateUser(id: number, data: Partial<User>): Promise<void> {
    try {
      console.log(`Updating user with ID: ${id} and data:`, data);

      // Verifica se o usuário existe
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new Error(`User with ID ${id} not found`);

      // Se a senha estiver presente, criptografa antes de atualizar
      if (data.password) {
        const hashedPassword = await hash(data.password, 10);
        await this.prisma.user.update({
          where: { id },
          data: { ...data, password: hashedPassword }, // Garante que a senha seja criptografada
        });
        console.log(`Password updated successfully for user ID: ${id}`);
      } else { //
        await this.prisma.user.update({
          where: { id },
          data,
        });
        console.log(`User data updated successfully for ID: ${id}`);
      }
    } catch (error) {
      console.error('Error updating user in database:', error.message);
      throw new Error('Failed to update user');
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new Error(`User with ID ${id} not found`);

      await this.prisma.user.delete({
        where: { id },
      });
      console.log(`User deleted successfully with ID: ${id}`);
    } catch (error) {
      console.error('Error deleting user in database:', error);
      throw error;
    }
  }

  async findById(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) return null;

      return new User({
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password,
        createdAt: user.createdAt,
        role: user.role as 'admin' | 'user',
      });
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }
}
