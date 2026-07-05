import { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types/tipos';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('vianuvem_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string, otp: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (otp.length !== 6) {
      throw new Error('Código OTP inválido');
    }

    const mockUser: User = {
      id: '1',
      nome: email.split('@')[0],
      email,
      role: email.includes('admin') ? 'administrador' :
            email.includes('gerente') ? 'gerente' :
            email.includes('financeiro') ? 'financeiro' :
            email.includes('usados') ? 'usados' :
            email.includes('secretaria') ? 'secretaria' :
            email.includes('liberacao') ? 'liberacao' :
            email.includes('diretoria') ? 'diretoria' : 'vendedor',
      ativo: true,
      createdAt: new Date(),
    };

    setUser(mockUser);
    localStorage.setItem('vianuvem_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vianuvem_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
