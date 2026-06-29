import { Processo } from "../types";

interface Props {
  processo: Processo;
}

export default function WorkflowLiberacao({ processo }: Props) {

  return (

    <div className="space-y-2">

      <p className="font-semibold text-sm">
        Processo está OK?
      </p>

      <button
        className="w-full rounded bg-green-600 text-white py-2 hover:bg-green-700"
      >
        Enviar para Entrega
      </button>

      <button
        className="w-full rounded bg-red-600 text-white py-2 hover:bg-red-700"
      >
        Não, resolver pendência
      </button>

    </div>

  );

}