import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Processo } from '../entities/processo';

@Injectable()
export class ProcessoRepositoryPrisma {
  private prisma = new PrismaClient();

  async create(processo: Processo): Promise<void> {
    await this.prisma.processo.create({
      data: {
        ...processo.props,
        valorTotal: parseFloat(processo.props.valorTotal as unknown as string), // Converta para Float
        valorExecutado: parseFloat(processo.props.valorExecutado as unknown as string), // Converta para Float
        percentualExecucao: parseFloat(processo.props.percentualExecucao as unknown as string), // Converta para Float
        dataOrdemServico: processo.props.dataOrdemServico ? new Date(processo.props.dataOrdemServico) : undefined,
        dataPrazoFinal: processo.props.dataPrazoFinal ? new Date(processo.props.dataPrazoFinal) : undefined,
        dataEmpenho: processo.props.dataEmpenho ? new Date(processo.props.dataEmpenho) : undefined,
        numeroEmpenho: processo.props.numeroEmpenho || undefined,
        tempoRestante: processo.props.tempoRestante || undefined,
        probabilidade: processo.props.probabilidade || undefined,
        impacto: processo.props.impacto || undefined,
        nivelRisco: processo.props.nivelRisco || undefined,
        justificativaRisco: processo.props.justificativaRisco || undefined,
      },
    });
  }

  async findAll(): Promise<Processo[]> {
    const processos = await this.prisma.processo.findMany();
    return processos.map(p => new Processo({
      ...p,
      dataOrdemServico: p.dataOrdemServico || undefined,
      dataPrazoFinal: p.dataPrazoFinal || undefined,
      dataEmpenho: p.dataEmpenho || undefined,
      numeroEmpenho: p.numeroEmpenho || undefined,
      tempoRestante: p.tempoRestante || undefined,
      probabilidade: p.probabilidade || undefined,
      impacto: p.impacto || undefined,
      nivelRisco: p.nivelRisco || undefined,
      justificativaRisco: p.justificativaRisco || undefined,
    }));
  }
}
