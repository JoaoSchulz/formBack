import { Injectable } from '@nestjs/common';
import { ProcessoRepositoryPrisma } from '../../repositories/ProcessoRepositoryPrisma';
import { Processo } from '../../entities/processo';

@Injectable()
export class ListProcessosUseCase {
  constructor(private processoRepository: ProcessoRepositoryPrisma) {}

  async execute(): Promise<Processo[]> {
    return this.processoRepository.findAll();
  }
}
