import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Save } from 'lucide-react';

export default function NovoProcessoPage() {
  const navigate = useNavigate();
  const [tipoProcesso, setTipoProcesso] = useState<'venda' | 'compra' | ''>('');
  const [tipoCliente, setTipoCliente] = useState<'fisica' | 'juridica' | ''>('');
  const [temUsado, setTemUsado] = useState<'sim' | 'nao' | ''>('');
  const [mostrarDocumentos, setMostrarDocumentos] = useState(false);
  const [arquivos, setArquivos] = useState<Record<string, File>>({});


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Processo criado com sucesso!');
    navigate('/processos');
  };

  const handleCapturar = () => {
    setMostrarDocumentos(true);
  };

  type Documento = {
    nome: string;
    obrigatorio: boolean;
  };

  let documentos: Documento[] = [];

  if (tipoCliente === 'fisica' && temUsado === 'nao') {
    documentos = [
      { nome: 'PROPOSTA DE VENDA NBS', obrigatorio: true },
      { nome: 'COMPROVANTE DE ENDEREÇO', obrigatorio: true },
      { nome: 'CNH, RG OU CPF', obrigatorio: true },
      { nome: 'TERMO DE LGPD', obrigatorio: true },
      { nome: 'TERMO DE ENDEREÇO', obrigatorio: false },
      { nome: 'COMPROVANTE (SINAL DE ENTRADA)', obrigatorio: false },
      { nome: 'DECLARAÇÃO DE TERCEIROS', obrigatorio: false },
      { nome: 'OUTROS DOCUMENTOS', obrigatorio: false },
    ];
  }

  if (tipoCliente === 'fisica' && temUsado === 'sim') {
    documentos = [
      { nome: 'PROPOSTA DE VENDA NBS', obrigatorio: true },
      { nome: 'COMPROVANTE DE ENDEREÇO', obrigatorio: true },
      { nome: 'CNH, RG OU CPF', obrigatorio: true },
      { nome: 'TERMO DE LGPD', obrigatorio: true },
      { nome: 'DUT/ATPV-e', obrigatorio: true },
      { nome: 'CONSULTA DE MULTAS', obrigatorio: true },
      { nome: 'TERMO DE ENDEREÇO', obrigatorio: false },
      { nome: 'LAUDO CAUTELAR (PESQUISA)', obrigatorio: false },
      { nome: 'CHASSI MOTOR', obrigatorio: false },
      { nome: 'COMPROVANTE (SINAL DE ENTRADA)', obrigatorio: false },
      { nome: 'DECLARAÇÃO DE TERCEIROS', obrigatorio: false },
      { nome: 'OUTROS DOCUMENTOS', obrigatorio: false },
    ];
  }

  if (tipoCliente === 'juridica' && temUsado === 'sim') {
    documentos = [
      { nome: 'PROPOSTA DE VENDA NBS', obrigatorio: true },
      { nome: 'CONTRATO SOCIAL', obrigatorio: true },
      { nome: 'CARTÃO CNPJ', obrigatorio: true },
      { nome: 'COMPROVANTE DE ENDEREÇO', obrigatorio: true },
      { nome: 'CNH, RG OU CPF', obrigatorio: true },
      { nome: 'TERMO DE LGPD', obrigatorio: true },
      { nome: 'DUT/ATPV-e', obrigatorio: true },
      { nome: 'CONSULTA DE MULTAS', obrigatorio: true },
      { nome: 'INSCRIÇÃO ESTADUAL', obrigatorio: false },
      { nome: 'PROCURAÇÃO', obrigatorio: false },
      { nome: 'LAUDO CAUTELAR', obrigatorio: false },
      { nome: 'CHASSI MOTOR', obrigatorio: false },
      { nome: 'COMPROVANTE (SINAL DE ENTRADA)', obrigatorio: false },
      { nome: 'DECLARAÇÃO DE TERCEIROS', obrigatorio: false },
      { nome: 'TERMO DE ENDEREÇO', obrigatorio: false },
      { nome: 'OUTROS DOCUMENTOS', obrigatorio: false },
    ];
  }

  if (tipoCliente === 'juridica' && temUsado === 'nao') {
    documentos = [
      { nome: 'PROPOSTA DE VENDA NBS', obrigatorio: true },
      { nome: 'CONTRATO SOCIAL', obrigatorio: true },
      { nome: 'CARTÃO CNPJ', obrigatorio: true },
      { nome: 'INSCRIÇÃO ESTADUAL', obrigatorio: false },
      { nome: 'PROCURAÇÃO', obrigatorio: false },
      { nome: 'LAUDO CAUTELAR', obrigatorio: false },
      { nome: 'CHASSI MOTOR', obrigatorio: false },
      { nome: 'COMPROVANTE (SINAL DE ENTRADA)', obrigatorio: false },
      { nome: 'DECLARAÇÃO DE TERCEIROS', obrigatorio: false },
      { nome: 'TERMO DE ENDEREÇO', obrigatorio: false },
      { nome: 'OUTROS DOCUMENTOS', obrigatorio: false },
    ];
  }


  return (


    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Definições Do Processo</h2>

      {!tipoProcesso ? (
        // ETAPA 1
        <div>
          <h3 className="text-lg font-semibold text-center mb-6">
            VEÍCULO NOVO OU SEMINOVO ?
          </h3>

          <div className="flex justify-center w-full">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setTipoProcesso('venda')}
                className="w-56 p-4 rounded-lg border-2"
              >
                🚗 Veículo Novo
              </button>

              <button
                type="button"
                onClick={() => setTipoProcesso('compra')}
                className="w-56 p-4 rounded-lg border-2"
              >
                🚙 Veículo Seminovo
              </button>
            </div>
          </div>
        </div>

      ) : !tipoCliente ? (
        // ETAPA 2
        <div>
          <h3 className="text-lg font-semibold text-center mb-6">
            PESSOA FÍSICA OU JURÍDICA ?
          </h3>

          <div className="flex justify-center w-full">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setTipoCliente('fisica')}
                className="w-56 p-4 rounded-lg border-2"
              >
                👤 Pessoa Física
              </button>

              <button
                type="button"
                onClick={() => setTipoCliente('juridica')}
                className="w-56 p-4 rounded-lg border-2"
              >
                🏢 Pessoa Jurídica
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={() => {
                setTipoProcesso('');
              }}
              className="w-48 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              ← VOLTAR
            </button>
          </div>
        </div>

      ) : !temUsado ? (
        // ETAPA 3
        <div>
          <h3 className="text-lg font-semibold text-center mb-6">
            POSSUI USADO NA TROCA ?
          </h3>

          <div className="flex justify-center w-full">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setTemUsado('sim')}
                className="w-56 p-4 rounded-lg border-2"
              >
                🔄 Com Usado na Troca
              </button>

              <button
                type="button"
                onClick={() => setTemUsado('nao')}
                className="w-56 p-1 rounded-lg border-2"
              >
                ✨ Sem Usado na Troca
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={() => {
                setTipoCliente('');
              }}
              className="w-48 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              ← VOLTAR
            </button>
          </div>
        </div>

      ) : (
        // ETAPA FINAL
        <div className="space-y-6">

          {/* Resumo */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">
              Resumo do Processo
            </h3>

            <p>
              <strong>Tipo de veículo:</strong>{' '}
              {tipoProcesso === 'venda' ? 'Novo' : 'Seminovo'}
            </p>

            <p>
              <strong>Cliente:</strong>{' '}
              {tipoCliente === 'fisica'
                ? 'Física'
                : 'Jurídica'}
            </p>

            <p>
              <strong>Seminovo Como Pagamento:</strong>{' '}
              {temUsado === 'sim'
                ? 'Sim'
                : 'Não'}
            </p>

            {!mostrarDocumentos && (
              //{/* Formulário */}
              <div className="max-w-lg mx-auto space-y-4 border-4 border-red-500 bg-yellow-200 p-4">

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nº DA PROPOSTA *
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nome do Cliente *
                  </label>
                  <input
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                {tipoCliente === 'fisica' ? (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      CPF *
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      CNPJ *
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                )}



                {tipoProcesso === 'venda' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Chassi Veículo Novo *
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                )}

                {temUsado === 'sim' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Placa do Usado *
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                )}

                <div className="flex justify-center gap-4 mt-12">
                  <button
                    type="button"
                    onClick={() => setTemUsado('')}
                    className="w-48 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    ← Voltar
                  </button>

                  <button
                    type="button"
                    onClick={handleCapturar}
                    className="w-48 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    📷 Capturar
                  </button>


                </div>

              </div>

            )}

          </div>

          {mostrarDocumentos && (
            <div className="mt-12">
              <h3 className="text-lg font-semibold mb-4">
                Documentos para Captura
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {documentos.map((doc) => (
                  <label
                    key={doc.nome}
                    className={`block w-48 px-3 py-1 rounded-lg border-2 cursor-pointer text-left text-black transition-all hover:shadow-md hover:scale-[1.02] hover:text-white
  ${arquivos[doc.nome]
                        ? 'bg-green-100 hover:bg-green-700'
                        : doc.obrigatorio
                          ? 'bg-red-100 hover:bg-red-700'
                          : 'bg-slate-100 hover:bg-slate-700'
                      }`}
                  >
                    {doc.obrigatorio && (
                      <span className="text-red-600 mr-1">*</span>
                    )}

                    {doc.nome}

                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const arquivo = e.target.files?.[0];

                        if (arquivo) {
                          setArquivos((prev) => ({
                            ...prev,
                            [doc.nome]: arquivo,
                          }));
                        }
                      }}
                    />
                  </label>

                ))}
                <div className="h-12"></div>
              </div>

              <div className="flex justify-center gap-4 mt-12">
                <button
                  type="button"
                  onClick={() => {
                    setTipoProcesso('');
                    setTipoCliente('');
                    setTemUsado('');
                    setMostrarDocumentos(false);
                  }}
                  className="w-48 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  ✔ Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-48 py-1 bg-blue-600 text-white rounded-lg hover:bg-green-700"
                >
                  💾 Salvar Processo
                </button>


              </div>


            </div>
          )}
        </div>


      )
      }
    </div >
  );
}