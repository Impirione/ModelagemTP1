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
  rascunho: 'Rascunho',
  aguardando_gerente: 'Aguardando Gerente',
  aguardando_financeiro: 'Aguardando Financeiro',
  aguardando_usados: 'Aguardando Usados',
  aguardando_secretaria: 'Aguardando Secretaria',
  aguardando_liberacao: 'Aguardando Liberação',
  aprovado: 'Aprovado',
  reprovado: 'Reprovado',
};

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const meusProcessos = mockProcessos.filter(p =>
    user?.role === 'vendedor' ? p.vendedor.id === user.id : true
  );

  const processosRecentes = meusProcessos.slice(0, 5);

  const stats = [
    {
      label: 'Total de Processos',
      value: meusProcessos.length,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Em Andamento',
      value: meusProcessos.filter(p => !['aprovado', 'reprovado'].includes(p.status)).length,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Aprovados',
      value: meusProcessos.filter(p => p.status === 'aprovado').length,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Valor Total',
      value: `R$ ${(meusProcessos.reduce((acc, p) => acc + p.valor, 0) / 1000).toFixed(0)}k`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
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

      {/* Stats */}
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

      {/* Recent Processes */}
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
              {['vendedor', 'administrador'].includes(user?.role || '') && (
                <button
                  className="mt-4 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
                  onClick={() => navigate('/processos/novo')}
                >
                  Criar Primeiro Processo
                </button>
              )}
            </div>
          ) : (
            processosRecentes.map((processo) => (
              <div
                key={processo.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/processos/${processo.id}`)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{processo.cliente.nome}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded capitalize">
                      {processo.tipo}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{processo.veiculoNovo?.marca} {processo.veiculoNovo?.modelo || processo.veiculoUsado?.modelo}</span>
                    <span>•</span>
                    <span>Vendedor: {processo.vendedor.nome}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      R$ {processo.valor.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(processo.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-white text-sm rounded ${statusColors[processo.status]}`}>
                    {statusLabels[processo.status]}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}