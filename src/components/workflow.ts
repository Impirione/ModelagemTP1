import { Processo, Pendencia } from "../types/tipos";

export function proximoStatus(
    processo: Processo
): Processo["status"] {

    switch (processo.status) {

        case "aguardando_vendedor":
            return "aguardando_gerente";

        case "aguardando_gerente":

            if (
                processo.possuiUsado ||
                processo.tipoVeiculo === "seminovo"
            ) {
                return "aguardando_usados";
            }

            return "aguardando_financeiro";

        case "aguardando_usados":
            return "aguardando_financeiro";

        case "aguardando_financeiro":
            return "aguardando_secretaria";

        case "aguardando_secretaria":
            return "aguardando_liberacao";

        case "aguardando_liberacao":
            return "aguardando_entrega";

        case "aguardando_entrega":
            return "finalizado";

        default:
            return processo.status;
    }
}

export function voltarDaPendencia(processo: Processo) {

    switch (processo.retornoPendencia.setor) {

        case "gerente":
            return "aguardando_gerente";

        case "usados":
            return "aguardando_usados";

        case "financeiro":
            return "aguardando_financeiro";

        case "secretaria":
            return "aguardando_secretaria";

        case "liberacao":
            return "aguardando_liberacao";

        default:
            return "aguardando_vendedor";
    }

}

export function enviarPendencia(
  processo: Processo,
  setor: Pendencia["setor"],
  usuario: string,
  observacao: string
) {
  processo.retornoPendencia = {
    setor,
    usuario,
    observacao,
    data: new Date(),
  };

  processo.status = "pendencia_vendedor";
}

export function resolverPendencia(processo: Processo): Processo["status"] {

    const status = voltarDaPendencia(processo);

    processo.retornoPendencia = undefined;

    return status;

}