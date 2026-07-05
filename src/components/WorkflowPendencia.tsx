import { Processo } from "../types/tipos";
import { voltarDaPendencia } from "./workflow";
import ModalPendencia from "./ModeloPendencia";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

interface Props {
  processo: Processo;
  alterarStatus: (
    processo: Processo,
    novoStatus: Processo["status"]
  ) => void;
}

export default function WorkflowPendencia({ processo, alterarStatus }: Props) {

  return (

    <div className="space-y-2">

      <p className="font-semibold text-red-600">
        Resolver Pendências !
      </p>

      <button
        onClick={() =>
          alterarStatus(processo, voltarDaPendencia(processo))
        }
        className="w-full bg-blue-600 text-white rounded py-2"
      >
        Resolvido
      </button>

    </div>

  );

}