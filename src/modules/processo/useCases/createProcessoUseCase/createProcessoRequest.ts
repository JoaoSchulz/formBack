export interface CreateProcessoRequest {
  nomeProcesso: string; // Campo obrigatório
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
