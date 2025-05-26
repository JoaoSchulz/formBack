import { Controller, Post, Body, Get, Put, Param, Delete, Inject } from '@nestjs/common';
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
    console.log('Login request received:', body); // Log para verificar se a requisição chegou
    const result = await this.authenticateUserUseCase.execute(body);
    console.log('Login response:', result); // Log para verificar a resposta
    return result; // Retorne o payload completo com o usuário e o token
  }

  @Get()
  async findAll() {
    console.log('Fetching all users'); // Log para depuração
    const users = await this.userRepository.findAll();
    console.log('Users fetched:', users); // Log de sucesso
    return users;
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() body: Partial<UserBody>) {
    try {
      console.log('Update request received for user ID:', id, 'with data:', body); // Log request details
      await this.userRepository.updateUser(id, body);
      console.log('User updated successfully for ID:', id); // Log success
      return { message: 'User updated successfully' };
    } catch (error) {
      console.error('Error updating user:', error.message); // Log detalhado do erro
      throw new Error('Failed to update user');
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.userRepository.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}