import { Processo } from "../types/tipos";
import { proximoStatus } from "./workflow";
import ModalPendencia from "./ModeloPendencia";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

interface Props {
  processo: Processo;
  alterarStatus: (
    processo: Processo,
    novoStatus: Processo["status"]
  ) => void;

  enviarPendencia: (
    processo: Processo,
    setor: "gerente" | "usados" | "financeiro" | "secretaria" | "liberacao",
    usuario: string,
    observacao: string
  ) => void;
}


export default function WorkflowFinanceiro({ processo, alterarStatus, enviarPendencia }: Props) {

  const { user } = useAuth();
  const [modalPendencia, setModalPendencia] = useState(false);
  return (

    <div className="space-y-2">

      <p className="font-semibold text-sm">
        Processo está OK?
      </p>

      <button
        onClick={() =>
          alterarStatus(processo, proximoStatus(processo))
        }
        className="w-full rounded bg-green-600 text-white py-2 hover:bg-green-700"
      >
        Enviar para Secretaria de Vendas
      </button>

      <button
        onClick={() => setModalPendencia(true)}
        className="w-full rounded bg-red-600 text-white py-2 hover:bg-red-700"
      >
        Não, resolver pendência
      </button>

      <ModalPendencia
        aberto={modalPendencia}
        processo={processo}
        setor="financeiro"
        usuario={user.nome}
        enviarPendencia={enviarPendencia}
        onFechar={() => setModalPendencia(false)}
      />
    </div>

  );

}