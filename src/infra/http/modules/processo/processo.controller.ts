import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateProcessoUseCase } from 'src/modules/processo/useCases/createProcessoUseCase/createProcessoUseCase';
import { ListProcessosUseCase } from 'src/modules/processo/useCases/listProcessosUseCase/listProcessosUseCase';

@Controller('processos')
export class ProcessoController {
  constructor(
    private createProcessoUseCase: CreateProcessoUseCase,
    private listProcessosUseCase: ListProcessosUseCase,
  ) {}

  @Post()
  async create(@Body() body: any) {
    await this.createProcessoUseCase.execute(body);
    return { message: 'Processo created successfully' };
  }

  @Get()
  async list() {
    return this.listProcessosUseCase.execute(); // Retorna todos os processos
  }
}
