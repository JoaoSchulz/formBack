import { Module } from '@nestjs/common';
import { UserController } from './infra/http/modules/user/user.controller';
import { ProcessoController } from './infra/http/modules/processo/processo.controller';
import { CreateUserUseCase } from './modules/user/useCases/createUserUseCase/createUserUseCase';
import { AuthenticateUserUseCase } from './modules/user/useCases/authenticateUserUseCase/authenticateUserUseCase';
import { CreateProcessoUseCase } from './modules/processo/useCases/createProcessoUseCase/createProcessoUseCase';
import { ListProcessosUseCase } from './modules/processo/useCases/listProcessosUseCase/listProcessosUseCase';
import { UserRepositoryPrisma } from './modules/user/repositories/UserRepositoryPrisma';
import { ProcessoRepositoryPrisma } from './modules/processo/repositories/ProcessoRepositoryPrisma';

@Module({
  imports: [],
  controllers: [UserController, ProcessoController],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    CreateProcessoUseCase,
    ListProcessosUseCase,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryPrisma,
    },
    {
      provide: 'ProcessoRepository',
      useClass: ProcessoRepositoryPrisma,
    },
  ],
})
export class AppModule {}