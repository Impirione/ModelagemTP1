import { Cliente } from "./tipos";
import { Veiculo } from "./tipos";
import { User } from "./tipos";
import { Documento } from "./tipos";
import { Aprovacao } from "./tipos";

export interface ProcessoPendencia {
  id: string;

  cliente: Cliente;

  veiculoNovo?: Veiculo;
  veiculoUsado?: Veiculo;

  vendedor: User;

  tipoVeiculo: 'novo' | 'seminovo';
  tipoCliente: 'fisica' | 'juridica';
  possuiUsado: boolean;

  proposta: string;

  status:
    | 'aguardando_vendedor'
    | 'aguardando_gerente'
    | 'aguardando_usados'
    | 'aguardando_financeiro'
    | 'aguardando_secretaria'
    | 'aguardando_liberacao'
    | 'aguardando_entrega'
    | 'pendencia'
    | 'finalizado';

  retornoPendencia?: {
    setor:
      | 'gerente'
      | 'usados'
      | 'financeiro'
      | 'secretaria'
      | 'liberacao';

    usuario: string;      
    observacao?: string;  
    data?: Date;          
  };

  documentos: Documento[];

  aprovacoes: Aprovacao[];

  createdAt: Date;
  updatedAt: Date;
}