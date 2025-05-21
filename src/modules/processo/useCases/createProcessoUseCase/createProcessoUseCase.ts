import { Injectable } from '@nestjs/common';
import { ProcessoRepositoryPrisma } from '../../repositories/ProcessoRepositoryPrisma';
import { Processo } from '../../entities/processo';

interface CreateProcessoRequest {
  nomeProcesso: string;
  objeto: string;
  tipoContrato: string;
  etapaAtual: string;
  escolasImpactadas: number;
  estudantesImpactados: number;
  valorTotal: number;
  valorExecutado: number;
  percentualExecucao: number;
  dataOrdemServico?: Date;
  dataPrazoFinal?: Date;
  dataEmpenho?: Date;
  numeroEmpenho?: string;
  tempoRestante?: string;
  probabilidade?: string;
  impacto?: string;
  nivelRisco?: string;
  justificativaRisco?: string;
  userIp: string;
  userLocation: string;
  userDevice: string;
}

@Injectable()
export class CreateProcessoUseCase {
  constructor(private processoRepository: ProcessoRepositoryPrisma) {}

  async execute(data: CreateProcessoRequest): Promise<void> {
    if (!data.nomeProcesso) {
      throw new Error('O campo "nomeProcesso" é obrigatório.');
    }

    const processo = new Processo({
      ...data,
      dataRegistro: new Date(),
    });

    await this.processoRepository.create(processo);
  }
}
