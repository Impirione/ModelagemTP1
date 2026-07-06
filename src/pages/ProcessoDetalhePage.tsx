import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { mockProcessos } from '../data/mockData';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Upload,
  FileText,
  User,
  Car,
  Clock,
  Download,
} from 'lucide-react';

const statusColors: Record<string, string> = {
  aguardando_gerente: 'bg-gray-200',
  aguardando_financeiro: 'bg-gray-200',
  aguardando_usados: 'bg-gray-200',
  aguardando_secretaria: 'bg-gray-200',
  aguardando_liberacao: 'bg-gray-200',
  pendente_vendedor: 'bg-indigo-500',
  finalizado: 'bg-green-500',
};

const statusLabels: Record<string, string> = {
  aguardando_gerente: 'Aguardando Gerente',
  aguardando_financeiro: 'Aguardando Financeiro',
  aguardando_usados: 'Aguardando Usados',
  aguardando_secretaria: 'Aguardando Secretaria',
  aguardando_liberacao: 'Aguardando Liberação',
  finalizado: 'Finalizado',
};

const documentTypeLabels: Record<string, string> = {
  proposta: 'Proposta',
  documento_cliente: 'Documento do Cliente',
  comprovante_pagamento: 'Comprovante de Pagamento',
  documento_veiculo: 'Documento do Veículo',
  nota_fiscal_compra: 'Nota Fiscal de Compra',
  nota_fiscal_venda: 'Nota Fiscal de Venda',
  outros: 'Outros',
};

export default function ProcessoDetalhePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [observacao, setObservacao] = useState('');
  const [activeTab, setActiveTab] = useState('detalhes');

  const processo = mockProcessos.find(p => p.id === id);

  if (!processo) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Processo não encontrado</p>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => navigate('/processos')}
        >
          Voltar para Processos
        </button>
      </div>
    );
  }

  const handleAprovar = () => {
    alert('Processo aprovado com sucesso!');
  };

  const handleReprovar = () => {
    if (!observacao.trim()) {
      alert('Por favor, adicione uma observação para reprovar');
      return;
    }
    alert('Processo reprovado');
  };

  const handleUpload = () => {
    alert('Documento enviado com sucesso!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/processos')}>
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Processo {processo.id}
            </h1>
            <p className="text-gray-600 mt-1">{processo.cliente.nome}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-white rounded ${statusColors[processo.status]}`}>
          {statusLabels[processo.status]}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('documentos')}
                  className={`px-6 py-3 font-medium ${activeTab === 'documentos' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                >
                  Documentos
                </button>
                <button
                  onClick={() => setActiveTab('aprovacoes')}
                  className={`px-6 py-3 font-medium ${activeTab === 'aprovacoes' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                >
                  Histórico
                </button>
              </div>
            </div>
            <div>
              {activeTab === 'documentos' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Documentos Anexados</h3>
                    <button
                      onClick={handleUpload}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      <Upload className="h-4 w-4" />
                      Enviar Documento
                    </button>
                  </div>

                  {processo.documentos.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p>Nenhum documento anexado</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {processo.documentos.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-gray-600" />
                            <div>
                              <p className="font-medium">{doc.nome}</p>
                              <p className="text-sm text-gray-500">
                                {documentTypeLabels[doc.tipo]} • {doc.uploadedBy} • {new Date(doc.uploadedAt).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'aprovacoes' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Histórico do Processo</h3>

                  <div className="space-y-4">
                    {processo.aprovacoes.map((aprovacao) => (
                      <div
                        key={aprovacao.id}
                        className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg"
                      >
                        <div className={`p-2 rounded-full ${aprovacao.status === 'aprovado' ? 'bg-green-100' :
                          aprovacao.status === 'reprovado' ? 'bg-red-100' : 'bg-yellow-100'
                          }`}>
                          {aprovacao.status === 'aprovado' && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                          {aprovacao.status === 'reprovado' && <XCircle className="h-5 w-5 text-red-600" />}
                          {aprovacao.status === 'pendente' && <Clock className="h-5 w-5 text-yellow-600" />}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">{aprovacao.aprovador}</p>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded capitalize">
                              {aprovacao.role}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 capitalize">{aprovacao.status}</p>
                          {aprovacao.observacao && (
                            <p className="text-sm text-gray-700 mt-2 p-2 bg-gray-50 rounded">
                              {aprovacao.observacao}
                            </p>
                          )}
                          {aprovacao.dataAprovacao && (
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(aprovacao.dataAprovacao).toLocaleString('pt-BR')}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Resumo</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Vendedor</p>
                <p className="font-medium">{processo.vendedor.nome}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Data de Criação</p>
                <p className="font-medium">
                  {new Date(processo.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}