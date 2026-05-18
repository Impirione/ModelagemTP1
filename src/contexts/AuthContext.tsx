export type UserRole =
  | 'administrador'
  | 'vendedor'
  | 'gerente'
  | 'financeiro'
  | 'usados'
  | 'secretaria'
  | 'liberacao'
  | 'diretoria';

export type ProcessType = 'venda' | 'compra';

export type ProcessStatus =
  | 'rascunho'
  | 'aguardando_gerente'
  | 'aguardando_financeiro'
  | 'aguardando_usados'
  | 'aguardando_secretaria'
  | 'aguardando_liberacao'
  | 'aprovado'
  | 'reprovado';

export type DocumentType =
  | 'proposta'
  | 'documento_cliente'
  | 'comprovante_pagamento'
  | 'documento_veiculo'
  | 'nota_fiscal_compra'
  | 'nota_fiscal_venda'
  | 'outros';

export interface User {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  ativo: boolean;
  createdAt: Date;
}

export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  endereco: string;
}

export interface Veiculo {
  id: string;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  chassi: string;
  cor: string;
  tipo: 'novo' | 'usado';
}

export interface Documento {
  id: string;
  processoId: string;
  tipo: DocumentType;
  nome: string;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface Aprovacao {
  id: string;
  processoId: string;
  aprovador: string;
  role: UserRole;
  status: 'pendente' | 'aprovado' | 'reprovado';
  observacao?: string;
  dataAprovacao?: Date;
}

export interface Processo {
  id: string;
  tipo: ProcessType;
  cliente: Cliente;
  veiculoNovo?: Veiculo;
  veiculoUsado?: Veiculo;
  vendedor: User;
  valor: number;
  status: ProcessStatus;
  documentos: Documento[];
  aprovacoes: Aprovacao[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, otp: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}