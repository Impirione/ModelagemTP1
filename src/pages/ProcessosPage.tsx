import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { mockProcessos } from '../data/mockData';
import { Plus, Search, Filter } from 'lucide-react';

const statusColors: Record<string, string> = {
  aguardando_vendedor: 'bg-gray-500',
  aguardando_gerente: 'bg-yellow-500',
  aguardando_financeiro: 'bg-blue-500',
  aguardando_usados: 'bg-purple-500',
  aguardando_secretaria: 'bg-orange-500',
  aguardando_liberacao: 'bg-indigo-500',
};

const statusLabels: Record<string, string> = {
  aguardando_vendedor: 'Aguardando Vendedor',
  aguardando_gerente: 'Aguardando Gerente',
  aguardando_financeiro: 'Aguardando Financeiro',
  aguardando_usados: 'Aguardando Usados',
  aguardando_secretaria: 'Aguardando Secretaria',
  aguardando_liberacao: 'Aguardando Liberação',
};

export default function ProcessosPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [filterTipo, setFilterTipo] = useState<string>('todos');

  let processos = user?.role === 'vendedor'
    ? mockProcessos.filter(p => p.vendedor.id === user.id)
    : mockProcessos;

  if (searchTerm) {
    processos = processos.filter(p =>
      p.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cliente.cpf.includes(searchTerm) ||
      p.id.includes(searchTerm)
    );
  }

  if (filterStatus !== 'todos') {
    processos = processos.filter(p => p.status === filterStatus);
  }

  if (filterTipo !== 'todos') {
    processos = processos.filter(p => p.tipo === filterTipo);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Processos</h1>
          <p className="text-gray-600 mt-1">
            Gerencie todos os processos de venda e compra
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

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="           Buscar por cliente, CPF ou Processo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-90 max-w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="todos">Todos os Status</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

        </div>
      </div>

      {/* Processes List */}
      <div className="space-y-4">
        {processos.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-lg shadow">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Nenhum processo encontrado com os filtros aplicados</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('todos');
                setFilterTipo('todos');
              }}
              className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          processos.map((processo) => (
            <div
              key={processo.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/processos/${processo.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {processo.cliente.nome}
                    </h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded capitalize">
                      {processo.tipo}
                    </span>
                    <span className={`px-3 py-1 text-white text-sm rounded ${statusColors[processo.status]}`}>
                      {statusLabels[processo.status]}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Cliente</p>
                      <p className="font-medium text-gray-900">{processo.cliente.cpf}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Veículo</p>
                      <p className="font-medium text-gray-900">
                        {processo.veiculoNovo?.marca} {processo.veiculoNovo?.modelo || processo.veiculoUsado?.modelo}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Vendedor</p>
                      <p className="font-medium text-gray-900">{processo.vendedor.nome}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    R$ {processo.valor.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(processo.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}