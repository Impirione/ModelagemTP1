import { useState } from 'react';
import { mockUsers } from '../data/mockData';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import type { UserRole } from '../types/tipos';

const roleLabels: Record<UserRole, string> = {
  administrador: 'Administrador',
  vendedor: 'Vendedor',
  gerente: 'Gerente',
  financeiro: 'Financeiro',
  usados: 'Usados',
  secretaria: 'Secretaria de Vendas',
  liberacao: 'Liberação',
  diretoria: 'Diretoria',
};

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    role: 'vendedor' as UserRole,
  });

  const filteredUsers = mockUsers.filter(u =>
    u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Usuário criado com sucesso!');
    setIsDialogOpen(false);
    setFormData({ nome: '', email: '', role: 'vendedor' });
  };

  const handleDelete = (userId: string) => {
    alert('Usuário excluído com sucesso');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
          <p className="text-gray-600 mt-1">Gerencie os usuários do sistema</p>
        </div>
        <button 
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Novo Usuário
        </button>
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Criar Novo Usuário</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium mb-2">Nome Completo</label>
                <input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                  className="w-120 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-120 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-2">Perfil</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {Object.entries(roleLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Criar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            placeholder="          Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{user.nome}</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{roleLabels[user.role]}</span>
                  {user.ativo && <span className="px-2 py-1 bg-green-500 text-white text-xs rounded">Ativo</span>}
                </div>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Criado em {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}