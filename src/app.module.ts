import { Module } from '@nestjs/common';
import { UserController } from './infra/http/modules/user/user.controller';
import { CreateUserUseCase } from './modules/user/useCases/createUserUseCase/createUserUseCase';
import { AuthenticateUserUseCase } from './modules/user/useCases/authenticateUserUseCase/authenticateUserUseCase';
import { UserRepositoryPrisma } from './modules/user/repositories/UserRepositoryPrisma';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPrisma,
    },
  ],
})
export class AppModule {}