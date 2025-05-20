-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE "Processo" (
    "id" SERIAL NOT NULL,
    "nomeProcesso" TEXT NOT NULL,
    "objeto" TEXT NOT NULL,
    "tipoContrato" TEXT NOT NULL,
    "etapaAtual" TEXT NOT NULL,
    "escolasImpactadas" INTEGER NOT NULL,
    "estudantesImpactados" INTEGER NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "valorExecutado" DOUBLE PRECISION NOT NULL,
    "percentualExecucao" DOUBLE PRECISION NOT NULL,
    "dataOrdemServico" TIMESTAMP(3),
    "dataPrazoFinal" TIMESTAMP(3),
    "dataEmpenho" TIMESTAMP(3),
    "numeroEmpenho" TEXT,
    "tempoRestante" TEXT,
    "probabilidade" TEXT,
    "impacto" TEXT,
    "nivelRisco" TEXT,
    "justificativaRisco" TEXT,
    "userIp" TEXT NOT NULL,
    "userLocation" TEXT NOT NULL,
    "userDevice" TEXT NOT NULL,
    "dataRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Processo_pkey" PRIMARY KEY ("id")
);
