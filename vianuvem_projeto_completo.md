# Vianuvem Solutions — Documento de Projeto Completo

> **Contexto:** Trabalho Prático da disciplina Modelagem de Sistemas — UFJF (Universidade Federal de Juiz de Fora), Departamento de Computação (DCC). Professor: Fabrício Martins Mendonça.
> Este documento consolida o conteúdo da Parte 1 (especificação do sistema) e da Parte 2 (entrega e apresentação), originalmente entregues em PDF.

---

## Parte 1 — Especificação do Sistema

### 1. Identificação do Software

**Nome:** Vianuvem Solutions

**Missão do produto:** O sistema tem como objetivo controlar, gerenciar e salvar a documentação relacionada aos fluxos de vendas e compras de automóveis em concessionárias, centralizando as informações e facilitando o acompanhamento dos processos.

**Escopo do sistema:**
- O Vianuvem, nesta versão inicial, não possui integrações com os sistemas internos da empresa.
- Os vendedores, além de responsáveis pelos seus processos, poderão acompanhar em tempo real o andamento das aprovações e as etapas de vendas e compras.
- O sistema não é responsável pela emissão de documentos, sendo utilizado apenas para o registro e inclusão das documentações pelos usuários participantes do fluxo do processo, que compõem a cadeia de aprovações.

---

### 2. Identificação dos Tipos de Usuários

| Perfil | Responsabilidade |
|---|---|
| **Administrador** | Faz o cadastro, configura as permissões dos novos usuários no sistema, exclui processos ou documentos do sistema. |
| **Vendedor** | Responsável por iniciar o processo de venda ou compra de veículos e também da inclusão dos dados necessários do cliente de acordo com as etapas do fluxo do processo. |
| **Gerente** | Responsável por aprovar a venda de acordo com a regra de negócio estabelecida. |
| **Financeiro** | Responsável por verificar se todos os comprovantes de pagamentos incluídos pelo vendedor estão de acordo com a proposta de venda (contrato) e se estes valores já constam na empresa. |
| **Usados** | Responsável por verificar as documentações dos veículos usados envolvidos na transação de venda ou compra. |
| **Secretaria de Vendas** | Responsável por anexar as notas de compra e de venda dos veículos. |
| **Liberação** | Responsável por verificar se todos os documentos anexados estão em ordem e se estão de acordo com a proposta vigente do cliente. É quem passa o pente fino para checar que não houve nada de errado com a venda ou compra do veículo. |
| **Diretoria** | Visualiza todas as etapas do processo e pode incluir documentações, porém não participa do fluxo do processo. |

**Sistemas externos integrados:**

- **NBS:** Utilizado para gerar o Contrato (Proposta de venda ou compra do veículo), emissão da nota fiscal e recibo dos valores pagos.
- **Google Authenticator:** Usado para validação de acesso dos usuários (2FA).

---

### 3. Modelo de Processo de Software Adotado

- **Metodologia:** Scrum
- **Justificativa:** Praticidade e maior interação entre os membros. Por se tratar de um projeto do zero, a metodologia minimiza o risco de erro futuro através de ciclos iterativos de correção.
- **Número de Sprints:** ~10 sprints (uma reunião/sprint por semana)
- **Tempo de cada Sprint:** Aproximadamente uma hora, dependendo da pendência
- **Número de times:** 1
- **Product Owner:** Douglas Mariano
- **Scrum Master:** Alex Silva Israel
- **Time:** Desenvolvedores e Testers
- **Reuniões previstas:** Semanalmente, após a aula de quarta-feira

**Recursos tecnológicos:**

| Categoria | Tecnologia |
|---|---|
| Gerenciamento do projeto | Trello |
| Gerência de configuração | GitHub |
| Front-end (linguagens) | CSS, HTML, TypeScript |
| Back-end (linguagem) | JavaScript |
| Framework | React |
| Banco de dados | MySQL |

---

### 4. Especificação dos Requisitos Funcionais

#### Visão geral

| ID | Nome | Prioridade |
|---|---|---|
| RF1 | Criar usuário | Alta |
| RF2 | Editar permissões de usuário | Alta |
| RF3 | Excluir usuário | Média |
| RF4 | Excluir processos e documentos | Média |
| RF5 | Iniciar processo de venda/compra | Alta |
| RF6 | Incluir dados e documentos do cliente | Alta |
| RF7 | Acompanhar status do processo em tempo real | Alta |
| RF8 | Aprovar ou reprovar venda dos seus vendedores | Alta |
| RF9 | Verificar comprovantes de pagamento | Alta |
| RF10 | Gerenciar documentação de veículos usados | Alta |
| RF11 | Anexar notas de compra e venda | Alta |
| RF12 | Validar conformidade geral do processo | Alta |
| RF13 | Visualizar processos e intervir | Alta |
| RF14 | Autenticar acesso via Google Authenticator | Alta |
| RF15 | Buscar processos | Alta |
| RF16 | Registro obrigatório de motivo de não aprovação | Média |

---

#### Detalhamento dos Requisitos Funcionais

---

**RF1 — Criar Usuário**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 1 |
| Nome | Criar usuário |
| Objetivo | Permitir ao administrador cadastrar novos usuários no sistema, definindo perfil e credenciais de acesso. |
| Ator principal | Administrador |
| Fluxo principal | 1. O administrador acessa o painel de gerenciamento de usuários. 2. O sistema exibe o formulário de cadastro de novo usuário. 3. O administrador preenche nome, e-mail, perfil e senha provisória. 4. O administrador confirma o cadastro. 5. O sistema valida os dados informados. 6. O sistema cria o usuário e envia as credenciais de acesso por e-mail. |

---

**RF2 — Editar Permissões de Usuário**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 2 |
| Nome | Editar permissões de usuário |
| Objetivo | Permitir ao administrador alterar o perfil e as permissões de acesso de usuários existentes. |
| Ator principal | Administrador |
| Fluxo principal | 1. O administrador acessa a lista de usuários cadastrados. 2. O administrador seleciona o usuário desejado. 3. O sistema exibe os dados e permissões atuais do usuário. 4. O administrador altera o perfil ou as permissões. 5. O administrador salva as alterações. 6. O sistema registra a alteração com data e responsável. |

---

**RF3 — Excluir Usuário**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 3 |
| Nome | Excluir usuário |
| Objetivo | Permitir ao administrador remover um usuário do sistema, tornando seu acesso inativo. |
| Ator principal | Administrador |
| Fluxo principal | 1. O administrador acessa a lista de usuários cadastrados. 2. O administrador seleciona o usuário e aciona a opção "Excluir". 3. O sistema verifica se o usuário possui processos ativos pendentes. 4. O sistema solicita confirmação da exclusão. 5. O administrador confirma. 6. O sistema desativa o usuário, impedindo futuro acesso ao sistema. |

---

**RF4 — Excluir Processos e Documentos**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 4 |
| Nome | Excluir processos e documentos |
| Objetivo | Permitir ao administrador excluir processos de venda/compra ou documentos específicos do sistema. |
| Ator principal | Administrador |
| Fluxo principal | 1. O administrador localiza o processo ou documento a ser excluído. 2. O administrador aciona a opção "Excluir". 3. O sistema solicita confirmação e o motivo da exclusão. 4. O administrador informa o motivo e confirma. 5. O sistema remove permanentemente o item e registra a operação em log. |

---

**RF5 — Iniciar Processo de Venda/Compra**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 5 |
| Nome | Iniciar processo de venda/compra |
| Objetivo | Permitir ao vendedor abrir um novo processo de venda ou compra de veículo para um cliente. |
| Ator principal | Vendedor |
| Ator secundário | Sistema NBS |
| Fluxo principal | 1. O vendedor acessa a opção "Novo Processo". 2. O vendedor seleciona o tipo de operação: Venda ou Compra. 3. O vendedor preenche os dados do cliente e do veículo. 4. O vendedor adiciona ao processo veículos usados na negociação. 5. O vendedor vincula a proposta gerada no sistema NBS. 6. O vendedor submete o processo. 7. O sistema registra o processo e o encaminha ao Gerente para aprovação. |

---

**RF6 — Incluir Dados e Documentos do Cliente**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 6 |
| Nome | Incluir dados e documentos do cliente |
| Objetivo | Permitir ao vendedor anexar documentos e preencher informações do cliente ao longo das etapas do processo. |
| Ator principal | Vendedor |
| Fluxo principal | 1. O vendedor acessa o processo ativo. 2. O vendedor navega até a etapa correspondente. 3. O sistema exibe os documentos exigidos para aquela etapa. 4. O vendedor realiza o upload dos documentos (RG, CPF, comprovantes). 5. O sistema valida o formato e o tamanho dos arquivos. 6. O sistema vincula os documentos ao processo e os torna visíveis para os demais participantes do fluxo. |

---

**RF7 — Acompanhar Status do Processo em Tempo Real**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 7 |
| Nome | Acompanhar status do processo em tempo real |
| Objetivo | Permitir ao vendedor visualizar em qual etapa de aprovação seu processo se encontra e identificar pendências. |
| Ator principal | Vendedor |
| Fluxo principal | 1. O vendedor acessa a lista de seus processos. 2. O vendedor seleciona um processo. 3. O sistema exibe o fluxo de etapas com indicação das concluídas, da etapa atual e dos pendentes. 4. O sistema exibe comentários ou recusas registrados por outros usuários. |

---

**RF8 — Aprovar ou Reprovar Venda dos Seus Vendedores**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 8 |
| Nome | Aprovar ou reprovar venda dos seus vendedores |
| Objetivo | Permitir ao gerente analisar as condições da negociação e aprovar ou recusar uma venda de acordo com as regras de negócio. |
| Ator principal | Gerente |
| Fluxo principal | 1. O sistema notifica o gerente sobre um novo processo aguardando aprovação. 2. O gerente acessa os detalhes do processo e a proposta vinculada. 3. O gerente analisa as condições da negociação. 4. O gerente aprova ou recusa o processo, podendo registrar um comentário. 5. O sistema atualiza o status do processo. 6. O sistema notifica o vendedor sobre a decisão. |

---

**RF9 — Verificar Comprovantes de Pagamento**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 9 |
| Nome | Verificar comprovantes de pagamento |
| Objetivo | Permitir ao responsável financeiro conferir se os comprovantes de pagamento estão em conformidade com o contrato e se os valores constam na empresa. |
| Ator principal | Financeiro |
| Ator secundário | Sistema NBS |
| Fluxo principal | 1. O sistema notifica o financeiro sobre um processo aguardando validação. 2. O financeiro acessa o processo e visualiza os comprovantes de pagamento anexados. 3. O financeiro confere os valores com a proposta/contrato registrado no NBS. 4. O financeiro confirma a conformidade ou sinaliza divergência com comentário. 5. O sistema atualiza o status do processo e notifica o próximo responsável. |

---

**RF10 — Gerenciar Documentação de Veículos Usados**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 10 |
| Nome | Gerenciar documentação de veículos usados |
| Objetivo | Permitir ao responsável pelo setor de Usados verificar e validar as documentações dos veículos usados envolvidos na transação. |
| Ator principal | Usados |
| Fluxo principal | 1. O sistema notifica o setor Usados sobre um processo com pendência de documentação de veículo. 2. O usuário acessa o processo e visualiza as documentações do veículo (CRLV, laudos, etc.). 3. O usuário valida as documentações ou registra inconsistências. 4. O usuário conclui a etapa. 5. O sistema libera o processo para a Secretaria de Vendas. |

---

**RF11 — Anexar Notas de Compra e Venda**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 11 |
| Nome | Anexar notas de compra e venda |
| Objetivo | Permitir à Secretaria de Vendas inserir as notas fiscais de compra e de venda dos veículos no processo. |
| Ator principal | Secretaria de Vendas |
| Ator secundário | Sistema NBS |
| Fluxo principal | 1. O sistema notifica a Secretaria de Vendas sobre processos aguardando notas fiscais. 2. O usuário acessa o processo correspondente. 3. O usuário realiza o upload das notas de compra e/ou venda geradas no NBS. 4. O sistema valida o formato dos arquivos. 5. O sistema registra os documentos e encaminha o processo à etapa de Liberação. |

---

**RF12 — Validar Conformidade Geral do Processo**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 12 |
| Nome | Validar conformidade geral do processo |
| Objetivo | Permitir ao responsável pela Liberação realizar uma revisão completa de todos os documentos e etapas antes da conclusão do processo. |
| Ator principal | Liberação |
| Fluxo principal | 1. O sistema notifica o responsável pela Liberação sobre um processo pronto para revisão final. 2. O usuário acessa o processo e analisa todos os documentos e etapas registradas. 3. O usuário confere se a proposta atual coincide com os documentos e valores registrados. 4. O usuário aprova a liberação ou aponta inconsistências com comentários detalhados. 5. O sistema marca o processo como concluído ou o devolve para correção, notificando o responsável. |

---

**RF13 — Visualizar Processos e Intervir**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 13 |
| Nome | Visualizar processos e intervir |
| Objetivo | Permitir à Diretoria acompanhar qualquer processo em qualquer etapa e incluir documentações, sem participar do fluxo de aprovações. |
| Ator principal | Diretoria |
| Fluxo principal | 1. O usuário da Diretoria acessa o painel geral de processos. 2. O usuário aplica filtros por status, data, vendedor ou tipo de operação. 3. O sistema exibe os processos correspondentes com todos os seus detalhes. 4. O usuário visualiza o processo desejado. 5. Opcionalmente, o usuário anexa documentos ou registra comentários sem alterar o fluxo de aprovações. |

---

**RF14 — Autenticar Acesso via Google Authenticator**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 14 |
| Nome | Autenticar acesso via Google Authenticator |
| Objetivo | Garantir que todos os usuários realizem autenticação de dois fatores via Google Authenticator ao efetuar login. |
| Ator principal | Usuário (todos os perfis) |
| Ator secundário | Google Authenticator |
| Fluxo principal | 1. O usuário acessa a tela de login e informa seu e-mail e senha. 2. O sistema valida as credenciais. 3. O sistema solicita o código de verificação gerado pelo Google Authenticator. 4. O usuário informa o código. 5. O sistema valida o código e concede o acesso. 6. O sistema redireciona o usuário para a tela principal correspondente ao seu perfil. |

---

**RF15 — Buscar Processos**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 15 |
| Nome | Buscar processos |
| Objetivo | Permitir que os usuários possam pesquisar processos no sistema. |
| Ator principal | Usuário (todos os perfis) |
| Fluxo principal | 1. Acesso à tela de processos. 2. O usuário utiliza filtros de busca (número do processo, cliente, status, data ou vendedor). |

---

**RF16 — Registro Obrigatório de Motivo de Não Aprovação**

| Campo | Conteúdo |
|---|---|
| Número | Requisito Funcional 16 |
| Nome | Registro obrigatório do motivo de não aprovação |
| Objetivo | Garantir que toda reprovação em qualquer etapa do fluxo seja justificada. |
| Ator principal | Usuários aprovadores |
| Fluxo principal | 1. Seleção de reprovação. 2. Sistema solicita motivo obrigatório. 3. Usuário informa justificativa. 4. Sistema registra decisão e motivo. 5. Notificação ao responsável anterior. |

---

### 5. Diagrama de Casos de Uso

O diagrama contém os seguintes atores e agrupamentos de casos de uso:

**Atores:** Admin, Vendedor, Diretoria, Gerente, Sistema NBS (externo), Usados, Financeiro, Liberação, Secretaria de Vendas, Todos os usuários, Sistema Google Authenticator (externo).

**Agrupamentos:**

- **Gerenciamento de Usuários:** RF01 Criar usuário, RF02 Editar permissões de usuário, RF03 Excluir usuário, RF04 Excluir processos e documentos.
- **Processos de Venda e Compra:** RF05 Iniciar processo de venda/compra, RF06 Incluir dados e documentos do cliente, RF07 Acompanhar status do processo em tempo real.
- **Diretoria:** RF13 Visualizar processos e intervir.
- **Aprovação Gerencial:** RF08 Aprovar ou reprovar venda, RF16 Registro obrigatório de motivo de não aprovação.
- **Gestão de Veículos Usados:** RF10 Gerenciar documentação de veículos usados.
- **Validação Financeira:** RF09 Verificar comprovantes de pagamento.
- **Liberação Final:** RF12 Validar conformidade geral do processo.
- **Secretaria de Vendas:** RF11 Anexar notas de compra e venda.
- **Geral:** RF15 Buscar processos.
- **Autenticação:** RF14 Autenticar acesso via Google Authenticator.

---

### 6. Requisitos Não-Funcionais

| ID | Nome | Descrição |
|---|---|---|
| RNF1 | Autenticação obrigatória de dois fatores | Todo acesso de usuário ao sistema deve exigir autenticação em dois fatores (2FA) via Google Authenticator. Não há exceção de perfil ou operação. O sistema carregará apenas a tela de login e troubleshooting para o usuário até sua autenticação. |
| RNF2 | Conformidade com LGPD | O sistema deve tratar os dados pessoais de clientes e usuários conforme a Lei Geral de Proteção de Dados (LGPD). Nenhum dado pessoal deve ser compartilhado com terceiros sem consentimento explícito. |
| RNF3 | Controle de funcionalidade baseado em perfil | O sistema deve garantir que cada usuário tenha acesso apenas às funcionalidades e dados correspondentes ao seu perfil. |
| RNF4 | Registro de ações no sistema | O sistema deve garantir um log imutável onde todas as ações do sistema fiquem registradas com informação do usuário modificador, data e hora e ação realizada. Funções como criação, edição, exclusão, aprovação e outros devem ser registrados. |
| RNF5 | Suporte a acessos simultâneos | O sistema deve suportar múltiplos acessos de usuários simultaneamente sem queda significativa no desempenho do sistema. |
| RNF6 | Compatibilidade com navegadores e sistemas operacionais modernos | O sistema deve funcionar corretamente nos principais navegadores e sistemas operacionais modernos utilizados em ambiente corporativo. |
| RNF7 | Interface compreensível com mensagens de erros | O sistema deve exibir mensagens de erros claras e orientadas ao usuário, indicando o que ocorreu e o que fazer após o problema encontrado. |

---

### 7. Protótipo / Mockup

O protótipo inclui as seguintes telas:

1. **Tela inicial de login** — campos de e-mail e senha com botão "Continuar".
2. **Tela de autenticação 2FA** — campo para código de 6 dígitos gerado pelo Google Authenticator, com botões "Voltar" e "Entrar".
3. **Tela de lista de processos (perfil Administrador)** — listagem com nome do cliente, tipo de operação (Venda/Compra), status (ex: "Aguardando Gerente"), veículo, vendedor, valor e data. Filtros por status e tipo. Botão "+ Novo Processo".
4. **Tela de gerenciamento de usuários (perfil Administrador)** — listagem de usuários com nome, perfil, e-mail, data de criação, status (Ativo/Inativo) e ações de editar/excluir. Botão "+ Novo Usuário".
5. **Tela de lista de processos (perfil Vendedor)** — lista dos processos do próprio vendedor com status visível.
6. **Tela de lista de processos (perfis aprovadores)** — lista de processos de todos os vendedores, visível para gerente, financeiro, usados, etc.

---

### 8. Diagrama de Classes

**Classes identificadas e seus atributos/métodos:**

#### `Processo`
- `idProcesso: int`
- `numeroProcesso: String`
- `tipoOperacao: String`
- `statusAtual: String`
- `dataAtual: Date`
- `contratoNBSVinc: String`
- `+Processo(id: int, tipo: String, ide: String, tela: String): void`
- `+atualizarStatusComNome(status: String, tipo: String, ide: String, tela: String): void`
- `+adicionarComentarioAtorDesc(texto: String, acao: String): void`

#### `Cliente`
- `idCliente: int`
- `nome: String`
- `cpf: String`
- `rg: String`
- `telefone: String`
- `+Cliente(id: int, nome: String, cpf: String, rg: String, tel: String): String`

#### `Veiculo`
- `id: int`
- `modelo: String`
- `marca: String`
- `ano: int`
- `placa: String`
- `chassis: String`
- `idUsado: boolean`
- `+Veiculo(id: int, mod: String, marc: String, ano: int, pl: String, ch: String, aud: boolean): void`

#### `Documento`
- `idDocumento: int`
- `nomeDocumento: String`
- `tipoDocumento: String`
- `arquivoUrl: String`
- `tamanho: double`
- `dataInclusao: Date`
- `+Documento(id: int, nome: String, tipo: String, path: String, tam: double, tex: String): void`
- `+validarFormato(): boolean`

#### `Usuario` (classe base — superclasse)
- `idUsuario: int`
- `nome: String`
- `email: String`
- `login: String`
- `senha: String`
- `senhas: String`
- `statusAtivo: boolean`
- `+Usuario(id: int, nome: String, email: String, login: String, senha: String, senhas: String): boolean`
- `+autenticarDoisFatores(codigo: String): boolean`
- `+obterPerfil(): String`

#### `LogAuditoria` (associada a Usuario via «utility»)
- `responsavelUsuario: String`
- `acaoRealizada: String`
- `dataHora: Date`
- `+logAuditoria(id: int, user: String, acao: String): String`

#### `Vendedor` (herda de Usuario)
- `+iniciarProcesso(id: int, nome: String, tipo: String, dados: Cliente): Processo`
- `+vincularContrato(id: int, numContrato: String): void`
- `+incluirDadosCliente(idProcesso: int, dados: Cliente): void`
- `+anexarDocumentosCliente(idProcesso: int, doc: Documento): void`
- `+acompanharStatus(idProcesso: int): String`

#### `Admin` (herda de Usuario)
- `+adicionarUsuario(id: int, nome: String, email: String, login: String, senha: String, senhas: String): void`
- `+criarUsuario(id: int, nome: String, email: String, login: String, senha: String, senhas: String): void`
- `+verificarDocumentosVinculados(id: int): boolean`
- `+editarPermissaoUsuario(id: int): void`
- `+excluirProcessoOuDocumento(idProcesso: int): void`

#### `Gerente` (herda de Usuario)
- `+Gerente(id: int, nome: String, email: String, login: String, senha: String, senhas: String): void`
- `+analisarNegociacao(idProcesso: int): void`
- `+aprovarVenda(idProcesso: int, justificativa: String): void`
- `+reprovarVenda(idProcesso: int, justificativa: String): void`

#### `Financeiro` (herda de Usuario)
- `+Financeiro(id: int, nome: String, email: String, login: String, senha: String, senhas: String): void`
- `+verificarComprovantes(idProcesso: int): void`
- `+validarValoresNBS(idProcesso: int): boolean`
- `+sinalizarDivergenciaFinanceira(idProcesso: int, comentario: String): void`

#### `Usados` (herda de Usuario)
- `+Usados(id: int, nome: String, email: String, login: String, senha: String, senhas: String): void`
- `+realizarRevisaoGeral(idProcesso: int): void`
- `+analisarNegociacao(idProcesso: int): void`
- `+devolverParaCorrecao(idProcesso: int, detalhes: String): void`

#### `SecretariaVendas` (herda de Usuario)
- `+SecretariaVendas(id: int, nome: String, email: String, login: String, senha: String, senhas: String): void`
- `+verificarNotaCompraVenda(idProcesso: int): void`
- `+anexarNotaVendaCompra(idProcesso: int, nota: Documento): void`

#### `Usadin` / `Liberacao` (herda de Usuario)
- `+Liberacao(id: int, nome: String, email: String, login: String, senha: String, senhas: String): void`
- `+realizarRevisaoGeral(idProcesso: int): void`
- `+devolverParaCorrecao(idProcesso: int, detalhes: String): void`

#### `Diretoria` (herda de Usuario)
- `+Diretoria(id: int, nome: String, email: String, login: String, senha: String, senhas: String): void`
- `+obterPaineGeral(filtros: String): Collection`
- `+visualizarTodosProcessos(idProcesso: int): void`
- `+interveirComentDocumento(idProcesso: int, doc: Documento): void`

**Relacionamentos:**
- `Processo` 1..* — 1 `Cliente` (associação "pertence")
- `Processo` 1 — 0..1 `Veiculo` novo (associação "contém")
- `Processo` 1 — 0..1 `Veiculo` usado (associação "possui")
- `Processo` 1 — 0..* `Documento` (composição "contém")
- `Usuario` é superclasse de: `Vendedor`, `Admin`, `Gerente`, `Financeiro`, `Usados`, `SecretariaVendas`, `Liberacao`, `Diretoria`
- `LogAuditoria` associada a `Usuario` via estereótipo «utility»

---

### 9. Diagrama de Transição de Estados

Estados do `Processo` e suas transições:

```
[início] 
  → Processo Criado
      → [iniciarProcesso()]
  → Em verificação do vendedor
      → [anexarDocumentos()]
  → Aguardando documentos
      → [documentos completos]
  → Em aprovação do gerente
      → {aprovação do gerente?}
          → [reprovado] → Em verificação do vendedor (retorno)
          → [aprovado]
  → Em análise financeira
      → {pendente de correção?}
          → [sim] → Em aprovação do gerente (retorno)
          → [não]
  → Em liberação
      → [realizarLiberação()]
  → Aprovado
      → [fim]
```

---

### 10. Diagramas de Sequência

#### RF1 — Criar Usuário

**Participantes:** Administrador, UI - Visão do Usuário, Usuario (classe), Banco de Dados

**Fluxo:**
1. Administrador → UI: Preencher dados e confirmar cadastro
2. UI → UI: Validar dados
3. **[alt] Dados inválidos:** UI → Administrador: Exibir mensagem de erro
4. **[Dados válidos]:**
   - UI → Usuario: Instanciar Usuario
   - UI → Banco de Dados: Salvar usuário
   - Banco de Dados → UI: Confirmação
   - UI → Administrador: Usuário criado com sucesso

---

#### RF5 — Iniciar Processo de Venda/Compra

**Participantes:** Vendedor, UI - Novo Processo de Venda/Compra, ProcessoService, Processo, DocumentoCliente, Banco de Dados

**Fluxo:**
1. Vendedor → UI: Iniciar novo processo
2. UI → Vendedor: Exibir opções (Venda / Compra)
3. Vendedor → UI: Selecionar tipo + preencher dados (nome do cliente, número da proposta, dados do veículo)
4. UI → ProcessoService: Enviar dados do processo
5. ProcessoService → ProcessoService: Validar dados
6. **[alt] Dados inválidos:** ProcessoService → UI: Erro de validação → UI → Vendedor: Exibir mensagem de erro
7. **[Dados válidos]:**
   - ProcessoService → Processo: Criar Processo
   - ProcessoService → DocumentoCliente: Anexar documentos do cliente
   - ProcessoService → Banco de Dados: Salvar processo
   - Banco de Dados → ProcessoService: Confirmação
   - ProcessoService → UI: Processo criado com sucesso
   - UI → Vendedor: Exibir número do processo

---

## Parte 2 — Entrega e Apresentação

> **Instituição:** Universidade Federal de Juiz de Fora – UFJF  
> **Departamento:** Departamento de Computação (DCC)  
> **Disciplina:** Modelagem de Sistemas  
> **Professor:** Fabrício Martins Mendonça  
> **Valor:** 20 pontos  
> **Número máximo de alunos por grupo:** 5 (cinco)

---

### Especificação da Parte 2

A última etapa do trabalho prático corresponde à **entrega do código-fonte** do sistema implementado conforme especificação entregue na parte 1, e à **apresentação do software em sala de aula**.

---

### O que deve ser entregue

1. **Código-fonte do sistema** implementado pelo grupo, bem como instruções de como executá-lo em um ambiente de execução. O código-fonte pode ser compartilhado com o professor através de um link no ClassRoom que redireciona para um software de gerência de configuração (ex: GitHub), ou enviado em formato `.ZIP` através do ClassRoom.

2. **Documento de requisitos atualizado** — em caso de mudanças e atualizações no documento de requisitos do software (parte 1 do trabalho), este documento deve ser reenviado no ClassRoom em formato DOCX ou PDF, **destacando as mudanças realizadas** desde a entrega da parte 1.

---

### Apresentação

- Presença obrigatória de todos os alunos do grupo no dia da apresentação.
- Duração: **mínimo de 10 minutos** e **máximo de 15 minutos**.

**Conteúdo obrigatório da apresentação:**
- Ideia e escopo do sistema
- Arquitetura do software
- Tecnologias utilizadas (linguagens de programação, APIs, frameworks, banco de dados, etc.)
- Como se deu a conexão do front-end com back-end e com o banco de dados (ou arquivos de persistência em JSON, TXT, etc.)
- Funcionalidades implementadas
- Simulação do funcionamento do sistema em sala de aula

---

### Critérios de Correção

| # | Critério | Pontuação |
|---|---|---|
| 1 | Apresentação da ideia e escopo do sistema | +2 pts |
| 2 | Conhecimento sobre a área do software proposto | +2 pts |
| 3 | Apresentação da arquitetura do software | +3 pts |
| 4 | Apresentação e domínio das tecnologias usadas | +3 pts |
| 5 | Interface e experiência do usuário (UI e UX) | +3 pts |
| 6 | Integração front-end, back-end e banco de dados (ou arquivo) | +3 pts |
| 7 | Apresentação e domínio das funcionalidades implementadas | +4 pts |
| **Total** | | **20 pts** |

---

### Status de Desenvolvimento do Sistema

#### Alterações realizadas até agora

- Estruturação da aplicação front-end em React com navegação entre login, tela inicial, processos, novo processo, detalhe de processo e usuários.
- Implementação de autenticação com armazenamento local de sessão e fluxo em duas etapas, simulando a validação por Google Authenticator.
- Criação de rotas protegidas para impedir acesso às telas internas sem autenticação.
- Integração do front-end com um back-end Node.js/Express usando persistência em JSON para usuários e processos.
- Implementação das telas de listagem e cadastro/remoção básica de usuários.
- Implementação da listagem de processos com busca, filtros e atualização reativa quando há mudanças no backend.
- Implementação da tela de novo processo com fluxo guiado por etapas para definição do tipo de operação, tipo de cliente e presença de veículo usado.
- Implementação da tela de detalhe do processo com apoio às ações de aprovação e reprovação por perfil, além de registro de observações.
- Organização do layout principal com menu lateral, cabeçalho e identificação do usuário logado.

#### Próximas atualizações previstas

- Ajustar o fluxo de cadastro e edição de usuários para suportar permissões múltiplas com consistência no formulário e no backend.
- Completar as validações de negócio do processo, incluindo campos obrigatórios, estados pendentes e transições mais rigorosas.
- Evoluir o fluxo de documentos para representar upload real, validação de tipos de arquivo e associação por etapa do processo.
- Refinar o painel de detalhe do processo para mostrar histórico, comentários e trilha de auditoria com mais clareza.
- Melhorar a autenticação para separar de forma mais explícita a etapa de senha e a etapa de 2FA.
- Revisar a experiência visual e responsiva das telas para deixar a apresentação mais consistente em sala.
- Atualizar a documentação final com o estado consolidado da implementação e as diferenças em relação à especificação original.

---

## Referência Rápida — Tipos TypeScript do Projeto

Os tipos abaixo foram definidos no arquivo `index.ts` do projeto e correspondem ao diagrama de classes acima:

```typescript
export type UserRole =
  | 'administrador' | 'vendedor' | 'gerente' | 'financeiro'
  | 'usados' | 'secretaria' | 'liberacao' | 'diretoria';

export type ProcessStatus =
  | 'aguardando_gerente' | 'aguardando_financeiro' | 'aguardando_usados'
  | 'aguardando_secretaria' | 'aguardando_liberacao' | 'aguardando_vendedor'
  | 'aguardando_entrega' | 'pendencia' | 'finalizado';

export type DocumentType =
  | 'proposta' | 'documento_cliente' | 'comprovante_pagamento'
  | 'documento_veiculo' | 'nota_fiscal_compra' | 'nota_fiscal_venda' | 'outros';

export interface User {
  id: string; nome: string; email: string; login: string;
  role: UserRole[]; statusAtivo: boolean; createdAt: Date;
}

export interface Cliente {
  id: string; nome: string; tipoCliente: 'fisica' | 'juridica';
  cpf?: string; cnpj?: string; rg?: string; telefone: string;
}

export interface Veiculo {
  id: string; modelo: string; marca: string; ano: number;
  placa?: string; chassi: string; tipo: 'novo' | 'usado';
}

export interface Documento {
  id: string; processoId: string; tipo: DocumentType;
  nome: string; url: string; tamanho: number;
  uploadedBy: string; uploadedAt: Date;
}

export interface LogAuditoria {
  id: string; responsavelUsuario: string; acaoRealizada: string;
  entidadeAfetada: string; entidadeId: string; detalhes?: string; dataHora: Date;
}

// Aprovação discriminada — motivo obrigatório em reprovações (RF16)
export type Aprovacao =
  | { id: string; processoId: string; aprovador: string; role: UserRole; status: 'pendente'; }
  | { id: string; processoId: string; aprovador: string; role: UserRole; status: 'aprovado'; observacao?: string; dataAprovacao: Date; }
  | { id: string; processoId: string; aprovador: string; role: UserRole; status: 'reprovado'; motivoReprovacao: string; dataAprovacao: Date; };

export interface Processo {
  id: string; numeroProcesso: string;
  tipoOperacao: 'venda' | 'compra';
  tipoVeiculo: 'novo' | 'seminovo'; tipoCliente: 'fisica' | 'juridica';
  possuiUsado: boolean; cliente: Cliente;
  veiculoNovo?: Veiculo; veiculoUsado?: Veiculo; vendedor: User;
  proposta: string; contratoNBSVinc?: string;
  status: ProcessStatus; documentos: Documento[]; aprovacoes: Aprovacao[];
  createdAt: Date; updatedAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, otp: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
```
