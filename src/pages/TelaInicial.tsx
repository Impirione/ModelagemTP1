import { useAuth } from '../contexts/AuthContext';
import { mockProcessos } from '../data/mockData';
import { useNavigate } from 'react-router';
import {
  FileText,
  Clock,
  CheckCircle2,
  DollarSign,
  Plus,
} from 'lucide-react';

const statusColors: Record<string, string> = {
  rascunho: 'bg-gray-500',
  aguardando_gerente: 'bg-yellow-500',
  aguardando_financeiro: 'bg-blue-500',
  aguardando_usados: 'bg-purple-500',
  aguardando_secretaria: 'bg-orange-500',
  aguardando_liberacao: 'bg-indigo-500',
  aprovado: 'bg-green-500',
  reprovado: 'bg-red-500',
};

const statusLabels: Record<string, string> = {
  aguardando_gerente: 'Aguardando Gerente',
  aguardando_financeiro: 'Aguardando Financeiro',
  aguardando_usados: 'Aguardando Usados',
  aguardando_secretaria: 'Aguardando Secretaria',
  aguardando_liberacao: 'Aguardando Liberação',
  aprovado: 'Aprovado',
  reprovado: 'Reprovado',
};

export default function TelaInicialPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

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
      value: meusProcessos.filter(p => p.status === 'aprovado').length,
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
                    coluna 3 linha 1
                  </div>

                  <div>
                    coluna 4 linha 1
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
                    coluna 3 linha2
                  </div>

                  <div>
                    COLUNA 4 LINMHA2
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