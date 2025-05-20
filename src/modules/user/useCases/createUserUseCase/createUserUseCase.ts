import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../repositories/UserRepository';
import { hash } from 'bcrypt';
import { User } from '../../entities/user';

interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role?: 'admin' | 'user'; // Add optional role field
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async execute({ email, name, password, role = 'user' }: CreateUserRequest) {
    const user = new User({
      email,
      name,
      password: await hash(password, 10),
      createdAt: new Date(),
      role, // Set role
    });

    await this.userRepository.create(user);

    return user;
  }
}