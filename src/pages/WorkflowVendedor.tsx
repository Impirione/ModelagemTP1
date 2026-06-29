import { Processo } from "../types";

interface Props {
  processo: Processo;
}

function WorkflowVendedor({ processo }: { processo: Processo }) {

    return (
        <button
            className="w-full bg-blue-600 text-white rounded py-2"
        >
            Enviar para aprovação do gerente
        </button>
    );
}