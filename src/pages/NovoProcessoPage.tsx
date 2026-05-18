import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Save } from 'lucide-react';

export default function NovoProcessoPage() {
  const navigate = useNavigate();
  const [tipoProcesso, setTipoProcesso] = useState<'venda' | 'compra'>('venda');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Processo criado com sucesso!');
    navigate('/processos');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/processos')}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo Processo</h1>
          <p className="text-gray-600 mt-1">Criar um novo processo de venda ou compra</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo de Processo */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Tipo de Processo</h2>
          <select 
            value={tipoProcesso} 
            onChange={(e) => setTipoProcesso(e.target.value as 'venda' | 'compra')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="venda">Venda</option>
            <option value="compra">Compra</option>
          </select>
        </div>

        {/* Dados do Cliente */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Dados do Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="nomeCliente" className="block text-sm font-medium mb-2">Nome Completo</label>
              <input id="nomeCliente" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium mb-2">CPF</label>
              <input id="cpf" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium mb-2">Telefone</label>
              <input id="telefone" type="tel" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="emailCliente" className="block text-sm font-medium mb-2">Email</label>
              <input id="emailCliente" type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="endereco" className="block text-sm font-medium mb-2">Endereço</label>
              <input id="endereco" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        </div>

        {/* Veículo Novo */}
        {tipoProcesso === 'venda' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Veículo Novo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="marcaNovo" className="block text-sm font-medium mb-2">Marca</label>
                <input id="marcaNovo" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="modeloNovo" className="block text-sm font-medium mb-2">Modelo</label>
                <input id="modeloNovo" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="anoNovo" className="block text-sm font-medium mb-2">Ano</label>
                <input id="anoNovo" type="number" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="corNovo" className="block text-sm font-medium mb-2">Cor</label>
                <input id="corNovo" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="placaNovo" className="block text-sm font-medium mb-2">Placa</label>
                <input id="placaNovo" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="chassiNovo" className="block text-sm font-medium mb-2">Chassi</label>
                <input id="chassiNovo" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
          </div>
        )}

        {/* Veículo Usado */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            {tipoProcesso === 'venda' ? 'Veículo Usado (Entrada)' : 'Veículo'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="marcaUsado" className="block text-sm font-medium mb-2">Marca</label>
              <input id="marcaUsado" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="modeloUsado" className="block text-sm font-medium mb-2">Modelo</label>
              <input id="modeloUsado" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="anoUsado" className="block text-sm font-medium mb-2">Ano</label>
              <input id="anoUsado" type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="corUsado" className="block text-sm font-medium mb-2">Cor</label>
              <input id="corUsado" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="placaUsado" className="block text-sm font-medium mb-2">Placa</label>
              <input id="placaUsado" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="chassiUsado" className="block text-sm font-medium mb-2">Chassi</label>
              <input id="chassiUsado" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="valor" className="block text-sm font-medium mb-2">Valor Total</label>
              <input id="valor" type="number" step="0.01" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/processos')}
            className="flex-1 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            Criar Processo
          </button>
        </div>
      </form>
    </div>
  );
}