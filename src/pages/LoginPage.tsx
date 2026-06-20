import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!showOtp) {
      if (!email || !password) {
        alert('Preencha email e senha');
        return;
      }
      setShowOtp(true);
      return;
    }

    setLoading(true);
    try {
      await login(email, password, otp);
      navigate('/telainicial');
    } catch (error) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Vianuvem</h1>
            <p className="text-gray-600">Sistema de Gestão de Vendas</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!showOtp ? (
              <>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-1 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">Senha</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-1 py-2 border border-gray-300 rounded-md"
                  />
                </div>
<div className="flex justify-center">
  <button
    type="submit"
    className="w-64 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
  >
    Continuar
  </button>
</div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="text-center">
                    <label className="block text-sm font-medium">Código Google Authenticator</label>
                    <p className="text-sm text-gray-500 mt-1">
                      Digite o código de 6 dígitos do seu aplicativo
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-40 px-4 py-3 border border-gray-300 rounded-md text-center text-2xl tracking-widest"
                      placeholder="000000"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex-1 border border-gray-300 py-2 rounded-md hover:bg-gray-50"
                    onClick={() => {
                      setShowOtp(false);
                      setOtp('');
                    }}
                  >
                    Voltar
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? 'Entrando...' : 'Entrar'}
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p></p>
            <p className="mt-1 text-xs">
              
            </p>
          </div>
        </div>
      </div>
    </div>
  );
   
}