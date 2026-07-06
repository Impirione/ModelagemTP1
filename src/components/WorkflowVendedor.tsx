import { Processo } from "../types/tipos";
import { proximoStatus } from "./workflow";

interface Props {
    processo: Processo;
    alterarStatus: (
        processo: Processo,
        novoStatus: Processo["status"]
    ) => void;
}

export default function WorkflowVendedor({
    processo,
    alterarStatus,
}: Props) {

    return (
        <button
            onClick={() =>
                alterarStatus(processo, proximoStatus(processo))
            }
            className="w-full rounded bg-green-600 text-white py-2 hover:bg-green-700"
        >
            Enviar para aprovação do gerente
        </button>
    );
}