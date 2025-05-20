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
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.role) {
      throw new UnauthorizedException('User role is missing'); // Adicione uma verificação para o campo role
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Gerar o token JWT
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role }, // Inclua o campo role no payload
      'your-secret-key', // Substitua por uma chave secreta segura
      { expiresIn: '1h' } // Token expira em 1 hora
    );

    return { access_token: accessToken, role: user.role }; // Retorne o campo role
  }
}
