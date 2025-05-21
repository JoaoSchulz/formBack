import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateProcessoRequest } from 'src/modules/processo/useCases/createProcessoUseCase/createProcessoRequest';
import { CreateProcessoUseCase } from 'src/modules/processo/useCases/createProcessoUseCase/createProcessoUseCase';
import { ListProcessosUseCase } from 'src/modules/processo/useCases/listProcessosUseCase/listProcessosUseCase';

@Controller('processos')
export class ProcessoController {
  constructor(
    private createProcessoUseCase: CreateProcessoUseCase,
    private listProcessosUseCase: ListProcessosUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateProcessoRequest) {
    if (!body.nomeProcesso) {
      throw new Error('O campo "nomeProcesso" é obrigatório.'); // Validação no controlador
    }

    await this.createProcessoUseCase.execute(body);
    return { message: 'Processo criado com sucesso' };
  }

  @Get()
  async list() {
    return this.listProcessosUseCase.execute(); // Retorna todos os processos
  }
}
