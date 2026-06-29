import { Processo } from "../types";

interface Props {
  processo: Processo;
}

export default function WorkflowPendencia({ processo }: Props) {

  return (

    <div className="space-y-2">

      <p className="font-semibold text-red-600">
        Existem pendências
      </p>

      <button
        className="w-full rounded bg-blue-600 text-white py-2 hover:bg-blue-700"
      >
        Resolvido
      </button>

    </div>

  );

}