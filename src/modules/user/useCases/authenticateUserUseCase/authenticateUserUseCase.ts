import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { UserRepository } from '../../repositories/UserRepository';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async execute({ email, password }: AuthenticateUserRequest) {
    try {
      console.log('Authenticating user:', email); // Log para depuração
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        console.error('User not found:', email); // Log de erro
        throw new UnauthorizedException('Invalid credentials');
      }

      if (!user.role) {
        console.error('User role is missing for:', email); // Log de erro
        throw new UnauthorizedException('User role is missing');
      }

      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        console.error('Password mismatch for user:', email); // Log de erro
        throw new UnauthorizedException('Invalid credentials');
      }

      const accessToken = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'uma-chave-secreta-segura',
        { expiresIn: '1h' }
      );

      console.log('User authenticated successfully:', email); // Log de sucesso
      return { 
        access_token: accessToken, 
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        } 
      };
    } catch (error) {
      console.error('Error during authentication:', error); // Log detalhado do erro
      throw error;
    }
  }
}
