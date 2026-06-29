import { Processo, User } from '../types';

export const mockProcessos: Processo[] = [
  {
    id: '1',

    tipoVeiculo: 'novo',
    tipoCliente: 'juridica',
    possuiUsado: true,
    proposta: '789456',

    cliente: {
      id: 'c1',
      nome: 'EA Construção LTDA',
      cnpj: '90.588.080/0001-30',
    },
    veiculoNovo: {
      id: 'v1',
      chassi: '9BWZZZ377VT004251',
      tipo: 'novo',
    },
    veiculoUsado: {
      id: 'v2',
      placa: 'XYZ9W87',
      chassi: '9BGRD48X0JG123456',
      tipo: 'usado',
    },
    vendedor: {
      id: 'u1',
      nome: 'Carlos Vendedor',
      email: 'carlos@vianuvem.com',
      role: 'vendedor',
      ativo: true,
      createdAt: new Date('2024-01-01:08:12:55'),
    },
    status: 'aguardando_gerente',
    documentos: [
      {
        id: 'd1',
        processoId: '1',
        tipo: 'proposta',
        nome: 'Proposta_Corolla_Joao.pdf',
        url: '#',
        uploadedBy: 'Carlos Vendedor',
        uploadedAt: new Date('2024-05-15:09:54:02'),
      },
      {
        id: 'd2',
        processoId: '1',
        tipo: 'documento_cliente',
        nome: 'RG_Joao.pdf',
        url: '#',
        uploadedBy: 'Carlos Vendedor',
        uploadedAt: new Date('2024-05-15:12:02:55'),
      },
    ],
    aprovacoes: [
      {
        id: 'a1',
        processoId: '1',
        aprovador: 'Roberto Gerente',
        role: 'gerente',
        status: 'pendente',
      },
    ],
    createdAt: new Date('2024-05-15:12:55:02'),
    updatedAt: new Date('2024-05-15:14:15:02'),
  },
  {
    id: '2',

    tipoVeiculo: 'seminovo',
    tipoCliente: 'fisica',
    possuiUsado: false,
    proposta: '123456',

    cliente: {
      id: 'c2',
      nome: 'Maria Santos',
      cpf: '987.654.321-00',
    },
    veiculoUsado: {
      id: 'v3',
      placa: 'DEF5G67',
      chassi: '19XFC2F59LE123456',
      tipo: 'usado',
    },
    vendedor: {
      id: 'u2',
      nome: 'Ana Vendedora',
      email: 'ana@vianuvem.com',
      role: 'vendedor',
      ativo: true,
      createdAt: new Date('2024-01-01:17:15:02'),
    },
    status: 'aguardando_financeiro',
    documentos: [],
    aprovacoes: [
      {
        id: 'a2',
        processoId: '2',
        aprovador: 'Roberto Gerente',
        role: 'gerente',
        status: 'aprovado',
        observacao: 'Aprovado conforme política comercial',
        dataAprovacao: new Date('2024-05-16:17:55:03'),
      },
      {
        id: 'a3',
        processoId: '2',
        aprovador: 'Paula Financeiro',
        role: 'financeiro',
        status: 'pendente',
      },
    ],
    createdAt: new Date('2024-05-14:15:02:14'),
    updatedAt: new Date('2024-05-16:15:16:02'),
  },
  {
    id: '3',

    tipoVeiculo: 'novo',
    tipoCliente: 'fisica',
    possuiUsado: false,
    proposta: '456753',

    cliente: {
      id: 'c3',
      nome: 'Pedro Oliveira',
      cpf: '456.789.123-00',
    },
    veiculoNovo: {
      id: 'v4',
      chassi: 'WVW1K1AJ5LW123456',
      tipo: 'novo',
    },
    vendedor: {
      id: 'u1',
      nome: 'Carlos Vendedor',
      email: 'carlos@vianuvem.com',
      role: 'vendedor',
      ativo: true,
      createdAt: new Date('2024-01-01:10:12:22'),
    },
    status: 'aprovado',
    documentos: [],
    aprovacoes: [
      {
        id: 'a4',
        processoId: '3',
        aprovador: 'Roberto Gerente',
        role: 'gerente',
        status: 'aprovado',
        dataAprovacao: new Date('2024-05-10:14:20:59'),
      },
      {
        id: 'a5',
        processoId: '3',
        aprovador: 'Paula Financeiro',
        role: 'financeiro',
        status: 'aprovado',
        dataAprovacao: new Date('2024-05-11:15:01:55'),
      },
    ],
    createdAt: new Date('2024-05-09:14:25:01'),
    updatedAt: new Date('2024-05-11:14:28:06'),
  },
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    nome: 'Carlos Vendedor',
    email: 'carlos@vianuvem.com',
    role: 'vendedor',
    ativo: true,
    createdAt: new Date('2024-01-01:15:05:14'),
  },
  {
    id: 'u2',
    nome: 'Ana Vendedora',
    email: 'ana@vianuvem.com',
    role: 'vendedor',
    ativo: true,
    createdAt: new Date('2024-01-01:14:20:23'),
  },
  {
    id: 'u3',
    nome: 'Roberto Gerente',
    email: 'roberto@vianuvem.com',
    role: 'gerente',
    ativo: true,
    createdAt: new Date('2024-01-01:14:59:01'),
  },
  {
    id: 'u4',
    nome: 'Paula Financeiro',
    email: 'paula@vianuvem.com',
    role: 'financeiro',
    ativo: true,
    createdAt: new Date('2024-01-01:20:20:14'),
  },
  {
    id: 'u5',
    nome: 'Admin Sistema',
    email: 'admin@vianuvem.com',
    role: 'administrador',
    ativo: true,
    createdAt: new Date('2024-01-01:07:20:23'),
  },
];