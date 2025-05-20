export interface ProcessoSchema {
  id?: number;
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
  dataRegistro: Date;
}

export class Processo {
  constructor(public props: ProcessoSchema) {}
}