import { Processo } from "../types";

interface Props {
  processo: Processo;
}

export default function WorkflowEntrega({ processo }: Props) {

  return (

    <div className="space-y-2">

      <button
        className="w-full rounded bg-green-600 text-white py-2 hover:bg-green-700"
      >
        Entregue
      </button>

    </div>

  );

}