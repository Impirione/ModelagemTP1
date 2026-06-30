import { Processo } from "../types";

interface Props {
  processo: Processo;
}

export default function WorkflowGerente({ processo }: Props) {

  const precisaUsados =
    processo.possuiUsado || processo.tipoVeiculo === "seminovo";

  return (

    <div className="space-y-2">

      <p className="font-semibold text-sm">
        Processo está OK?
      </p>

      <button
        className="w-full rounded bg-green-600 text-white py-2 hover:bg-green-700"
      >
        {precisaUsados
          ? "Enviar para Análise de Veículo Seminovo"
          : "Enviar para Conferência Financeira"}
      </button>

      <button
        className="w-full rounded bg-red-600 text-white py-2 hover:bg-red-700"
      >
        Não, resolver pendência
      </button>

    </div>

  );
}