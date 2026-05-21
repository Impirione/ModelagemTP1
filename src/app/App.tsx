import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProcessosPage from '../pages/ProcessosPage';
import ProcessoDetalhePage from '../pages/ProcessoDetalhePage';
import NovoProcessoPage from '../pages/NovoProcessoPage';
import UsuariosPage from '../pages/UsuariosPage';
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/processos"
        element={
          <ProtectedRoute>
            <Layout>
              <ProcessosPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/processos/novo"
        element={
          <ProtectedRoute>
            <Layout>
              <NovoProcessoPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/processos/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <ProcessoDetalhePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute>
            <Layout>
              <UsuariosPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/ModelagemTP1">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}