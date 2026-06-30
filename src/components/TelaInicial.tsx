import WorkflowVendedor from "./WorkflowVendedor";
import WorkflowGerente from "./WorkflowGerente";
import WorkflowUsados from "./WorkflowUsados";
import WorkflowFinanceiro from "./WorkflowFinanceiro";
import WorkflowSecretaria from "./WorkflowSecretaria";
import WorkflowLiberacao from "./WorkflowLiberacao";
import WorkflowEntrega from "./WorkflowEntrega";
import WorkflowPendencia from "./WorkflowPendencia";
import WorkflowFinalizado from "./WorkflowFinalizado";
import { useAuth } from '../contexts/AuthContext';
import { mockProcessos } from '../data/mockData';
import { useNavigate } from 'react-router';
import {
  Clock,
  CheckCircle2,
  Plus,
  FileText,
  FilePlus,
  FolderOpen,
  MoreVertical,
  Pencil,
  Trash2,
  Settings,
} from 'lucide-react';
import { Processo } from '../types';

const statusColors: Record<string, string> = {
  aguardando_gerente: 'bg-yellow-500',
  aguardando_financeiro: 'bg-blue-500',
  aguardando_usados: 'bg-purple-500',
  aguardando_secretaria: 'bg-orange-500',
  aguardando_liberacao: 'bg-indigo-500',
  finalizado: 'bg-green-500',
};

const statusLabels: Record<string, string> = {
  aguardando_gerente: 'Aguardando Gerente',
  aguardando_financeiro: 'Aguardando Financeiro',
  aguardando_usados: 'Aguardando Usados',
  aguardando_secretaria: 'Aguardando Secretaria',
  aguardando_liberacao: 'Aguardando Liberação',
  finalizado: 'Encerrado',
};

export default function TelaInicialPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const renderAcoes = (processo: Processo) => {
  switch (processo.status) {
    case 'aguardando_vendedor':
      return <WorkflowVendedor processo={processo} />;

    case 'aguardando_gerente':
      return <WorkflowGerente processo={processo} />;

    case 'aguardando_usados':
      return <WorkflowUsados processo={processo} />;

    case 'aguardando_financeiro':
      return <WorkflowFinanceiro processo={processo} />;

    case 'aguardando_secretaria':
      return <WorkflowSecretaria processo={processo} />;

    case 'aguardando_liberacao':
      return <WorkflowLiberacao processo={processo} />;

    case 'aguardando_entrega':
      return <WorkflowEntrega processo={processo} />;

    case 'pendencia':
      return <WorkflowPendencia processo={processo} />;

    case 'finalizado':
      return <WorkflowFinalizado />;

    default:
      return null;
  }
};

  const meusProcessos = mockProcessos.filter(p =>
    user?.role === 'vendedor' ? p.vendedor.id === user.id : true
  );

  const processosRecentes = meusProcessos.slice(0, 5);

  const stats = [
    {
      label: 'Processos que atuo',
      value: meusProcessos.length,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Processos Em Andamento',
      value: meusProcessos.filter(p => !['aprovado', 'reprovado'].includes(p.status)).length,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Processos Finalizados',
      value: meusProcessos.filter(p => p.status === 'finalizado').length,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Bem-vindo, {user?.nome}
          </p>
        </div>
        {['vendedor', 'administrador'].includes(user?.role || '') && (
          <button
            onClick={() => navigate('/processos/novo')}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Novo Processo
          </button>
        )}
      </div>

      {/* Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* processos recentes*/}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Processos Recentes</h2>
          <button
            onClick={() => navigate('/processos')}
            className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
          >
            Ver Todos
          </button>
        </div>

        <div className="space-y-4">
          {processosRecentes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhum processo encontrado</p>
            </div>
          ) : (
            processosRecentes.map((processo) => (
              <div
                key={processo.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/processos/${processo.id}`)}
              >

                {/* GRID 4 COLUNAS */}
                <div className="grid grid-cols-4 gap-x-8 gap-y-3">

                  {/* ===================== COLUNA 1 ===================== */}

                  {/* Linha 1 */}
                  <div>
                    <span className="font-semibold text-gray-900">
                      {processo.id}
                    </span>
                    <h6></h6>

                  </div>

                  {/* ===================== COLUNA 2 ===================== */}

                  {/* Linha 1 */}
                  <div>
                    <div className="flex gap-2">
                      <span className="text-blue-700 text-xs">
                        {processo.tipoVeiculo === 'novo'
                          ? '🚗 Novo ➜'
                          : '🚙 Seminovo ➜'}
                      </span>

                      <span className="text-green-700 text-xs">
                        {processo.tipoCliente === 'fisica'
                          ? '👤 Física ➜'
                          : '🏢 Jurídica ➜'}
                      </span>

                      <span className="text-xs">
                        {processo.possuiUsado
                          ? '🔄 Com Usado'
                          : '✨ Sem Usado'}
                      </span>
                    </div>
                  </div>

                  <div>
                    {processo.status}
                  </div>

                  <div>
                    
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-black">Usuário: </span>
                      <span className="text-gray-600">{processo.vendedor.nome}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-black">Data: </span>
                      <span className="text-xs text-gray-600">{processo.createdAt.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600">
                      Cliente: {processo.cliente.nome}
                    </p>

                    <p className="text-xs text-gray-600">
                      {processo.tipoCliente === 'fisica'
                        ? 'CPF'
                        : 'CNPJ'}:
                      {' '}
                      {processo.cliente.cpf || processo.cliente.cnpj}
                    </p>
                    <p className="text-xs text-gray-600">
                      Chassi:
                      {' '}
                      {(processo.veiculoNovo?.chassi ||
                        processo.veiculoUsado?.chassi)?.slice(-7)}
                    </p>

                    {processo.possuiUsado && (
                      <p className="text-xs text-gray-600">
                        Placa: {processo.veiculoUsado?.placa}
                      </p>
                    )}

                    <p className="text-xs text-gray-600">
                      Nº Proposta: {processo.proposta}
                    </p>

                  </div>


                  <div>
                    <div className="flex items-center gap-3">

                      {/* Adicionar documentos */}
                      <button
                        type="button"
                        title="Adicionar documentos"
                        className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 border border-blue-300 flex items-center justify-center"
                      >
                        <FilePlus size={18} className="text-blue-700" />
                      </button>

                      {/* Visualizar documentos */}
                      <button
                        type="button"
                        title="Visualizar documentos"
                        className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 border border-green-300 flex items-center justify-center"
                      >
                        <FolderOpen size={18} className="text-green-700" />
                      </button>

                      {/* Menu */}
                      <div className="relative group">

                        <button
                          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 flex items-center justify-center"
                        >
                          <MoreVertical size={18} />
                        </button>

                        <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg hidden group-hover:block z-50">

                          <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                          >
                            <Settings size={16} />
                            Editar Indexadores
                          </button>

                          <button
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                          >
                            <Pencil size={16} />
                            Editar Processo
                          </button>

                          {/* Apenas administrador */}
                          {user.role === 'administrador' && (
                            <button
                              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 size={16} />
                              Excluir Processo
                            </button>
                          )}

                        </div>

                      </div>

                    </div>
                  </div>

                  <div>
                    {renderAcoes(processo)}
                  </div>

                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}