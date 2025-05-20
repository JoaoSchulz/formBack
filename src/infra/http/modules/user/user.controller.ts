import { Controller, Post, Body, Get, Inject } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { AuthenticateUserUseCase } from 'src/modules/user/useCases/authenticateUserUseCase/authenticateUserUseCase';
import { UserBody } from './dtos/userBody';
import { LoginBody } from './dtos/loginBody';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private authenticateUserUseCase: AuthenticateUserUseCase,
    @Inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  @Post()
  async createPost(@Body() body: UserBody) {
    return this.createUserUseCase.execute(body);
  }

  @Post('register')
  async register(@Body() body: UserBody) {
    return this.createUserUseCase.execute(body);
  }

  @Post('login')
  async login(@Body() body: LoginBody) {
    const result = await this.authenticateUserUseCase.execute(body);
    // Redirect logic can be handled in the frontend based on the role
    return result;
  }

  @Get()
  async findAll() {
    return this.userRepository.findAll();
  }
}