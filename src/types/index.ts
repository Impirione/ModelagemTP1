export type UserRole =
  | 'administrador'
  | 'vendedor'
  | 'gerente'
  | 'financeiro'
  | 'usados'
  | 'secretaria'
  | 'liberacao'
  | 'diretoria';

export type ProcessStatus =
  | 'aguardando_gerente'
  | 'aguardando_financeiro'
  | 'aguardando_usados'
  | 'aguardando_secretaria'
  | 'aguardando_liberacao'
  | 'aguardando_vendedor'
  | 'aguardando_entrega'
  | 'pendencia'
  | 'finalizado';

export type DocumentType =
  | 'proposta'
  | 'documento_cliente'
  | 'comprovante_pagamento'
  | 'documento_veiculo'
  | 'nota_fiscal_compra'
  | 'nota_fiscal_venda'
  | 'outros';

  export type TipoOperacao = 'compra' | 'venda';
  export type TipoCliente = 'fisica' | 'juridica';

export interface User {
  id: string;
  nome: string;
  email: string;
  role: UserRole[];
  ativo: boolean;
  createdAt: Date;
}

export interface Cliente {
  id: string;
  nome: string;
  cpf?: string;
  cnpj?: string
}

export interface Veiculo {
  id: string;
  placa?: string;
  chassi: string;
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

// RF4
export interface LogAuditoria {
  id: string;
  responsavelUsuario: string;  // userId
  acaoRealizada: string;       // ex: 'CRIACAO', 'APROVACAO', 'REPROVACAO', 'EXCLUSAO'
  entidadeAfetada: string;     // ex: 'Processo', 'Documento', 'Usuario'
  entidadeId: string;
  detalhes?: string;           // informação adicional opcional
  dataHora: Date;
}

export interface Processo {
  id: string;
  numeroProcesso: string;

  tipoOperacao: TipoOperacao;
  tipoVeiculo: 'novo' | 'seminovo';
  tipoCliente: TipoCliente;
  possuiUsado: boolean;
  
  cliente: Cliente;
  veiculoNovo?: Veiculo;
  veiculoUsado?: Veiculo;
  vendedor: User;

  proposta: string;             // número/referência da proposta no sistema NBS
  contratoNBSVinc?: string;     // contrato vinculado no NBS após geração

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