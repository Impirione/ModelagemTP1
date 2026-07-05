import { useState } from "react";
import { Processo, Pendencia } from "../types/tipos";
import { enviarPendencia } from "./workflow";

interface Props {
  aberto: boolean;
  processo: Processo;
  setor: Pendencia["setor"];
  usuario: string;
  onFechar: () => void;
}

export default function ModalPendencia({
  aberto,
  processo,
  setor,
  usuario,
  onFechar,
}: Props) {

  const [observacao, setObservacao] = useState("");

  if (!aberto) return null;

  function confirmar() {

    if (observacao.trim() === "") {
      alert("Informe o motivo da pendência.");
      return;
    }

    enviarPendencia(
      processo,
      setor,
      usuario,
      observacao
    );

    setObservacao("");

    onFechar();
  }

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg p-6 w-[500px] shadow-lg">

        <h2 className="text-lg font-bold mb-4">
          Resolver Pendência
        </h2>

        <p className="text-sm text-gray-600 mb-2">
          Descreva o motivo da devolução do processo.
        </p>

        <textarea
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          rows={6}
          className="w-full border rounded p-2"
          placeholder="Digite aqui..."
        />

        <div className="flex justify-end gap-3 mt-5">

          <button
            onClick={onFechar}
            className="px-4 py-2 rounded border"
          >
            Cancelar
          </button>

          <button
            onClick={confirmar}
            className="px-4 py-2 rounded bg-red-600 text-white"
          >
            Enviar Pendência
          </button>

        </div>

      </div>

    </div>

  );

}