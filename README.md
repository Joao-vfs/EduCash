# EduCash - Plataforma de Educação Financeira

Aplicação web desenvolvida em Next.js focada em educação financeira, permitindo que usuários gerenciem suas finanças, definam objetivos e acompanhem transações com CRUD completo.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização utilitária
- **React Hooks** - Gerenciamento de estado
- **Sistema de Autenticação** - Login e registro com sessões
- **Clean Architecture** - Separação de responsabilidades
- **Atomic Design** - Componentização escalável

## 📁 Arquitetura

O projeto segue os princípios de **Clean Architecture** e **Atomic Design**:

```
src/
├── app/                    # Rotas e páginas (App Router)
│   ├── (auth)/            # Rotas de autenticação
│   │   ├── login/
│   │   └── register/
│   ├── (protected)/       # Rotas protegidas
│   │   └── dashboard/
│   ├── error.tsx          # Página de erro global
│   └── not-found.tsx      # Página 404
├── components/            # Componentes (Atomic Design)
│   ├── atoms/            # Componentes básicos
│   ├── molecules/        # Combinações de atoms
│   └── organisms/        # Componentes complexos
├── templates/            # Templates de páginas
│   ├── login/
│   ├── register/
│   ├── dashboard/
│   ├── error/
│   └── not-found/
├── hooks/                # Custom hooks
│   ├── useTransactions.ts
│   ├── useModal.ts
│   ├── useFormValidation.ts
│   └── ...
├── services/             # Serviços de API
│   ├── api.ts           # HTTP Client
│   ├── auth/
│   └── transactions/
├── lib/                  # Bibliotecas e configurações
│   └── auth/            # Sistema de autenticação
├── icons/                # Componentes de ícones SVG
├── utils/                # Utilitários e helpers
├── constants/            # Constantes da aplicação
├── types/                # Definições de tipos TypeScript
└── providers/            # Context providers
```

## 🎨 Atomic Design

### Atoms
- `Button` - Botões com variantes (primary, outline, back)
- `Input` - Campos de entrada com validação
- `Text` - Componente de texto tipográfico
- `Progress` - Barra de progresso
- `Chip` - Tags selecionáveis
- `Card` - Container com variantes
- `IconButton` - Botões circulares com ícones

### Molecules
- `ChipGroup` - Grupo de chips selecionáveis
- `BalanceCard` - Card de exibição de saldo
- `RegistryCard` - Card para registros
- `TransactionItem` - Item de transação com ações (editar/deletar)
- `ConfirmDialog` - Dialog de confirmação customizado
- `RegistryModal` - Modal para criar/editar transações

### Organisms
- `TransactionList` - Lista de transações com loading state

## 🔧 Funcionalidades

### 🔐 Autenticação
Sistema completo de autenticação com:
- **Login de usuários** com validação de credenciais
- **Registro em múltiplas etapas**:
  - Step 1: Dados pessoais (nome, sobrenome, email)
  - Step 2: Seleção de objetivos financeiros
  - Step 3: Definição de senha
- **Proteção de rotas** via middleware
- **Gerenciamento de sessão** com cookies HTTP-only
- **Redirecionamento automático** para rotas protegidas
- **Feedback de erros** em tempo real
- **Persistência no localStorage** para acesso rápido

### 💰 Gestão de Transações (CRUD Completo)

#### ✅ Create (Criar)
- Registro de **ganhos** e **gastos**
- Modal customizado com validação
- Campos: nome da transação e valor
- Feedback visual de sucesso/erro

#### 📖 Read (Ler)
- Listagem de todas as transações do usuário
- Separação visual entre ganhos (↑ verde) e gastos (↓ vermelho)
- Carregamento paralelo de ganhos e gastos
- Estado de loading durante requisições
- Filtro automático por usuário logado

#### ✏️ Update (Atualizar)
- Edição de transações existentes
- Modal pré-preenchido com dados atuais
- Atualização em tempo real da lista
- Validação de campos

#### 🗑️ Delete (Deletar)
- Exclusão de transações
- Dialog de confirmação customizado
- Mensagem clara sobre a ação irreversível
- Atualização automática da lista

### 🎯 Dashboard
- Visualização de saldo total
- Cards para registrar ganhos e gastos
- Lista de transações com ações inline
- Ícones customizados (Edit e Trash)
- Design responsivo e moderno

### 🚨 Páginas de Erro

#### Error Page (`error.tsx`)
- Captura erros em runtime
- Exibe mensagem amigável
- Botão "Tentar novamente"
- Botão "Voltar para o início"
- Log automático de erros
- Exibe Error ID para debug

#### 404 Page (`not-found.tsx`)
- Página customizada para rotas não encontradas
- Design clean com grande "404"
- Navegação de retorno
- Mensagem clara e amigável

### ✅ Validação de Formulários
Sistema robusto de validação com hook customizado `useFormValidation`:

```typescript
const { errors, validate, handleChange, handleBlur, getError } = useFormValidation({
  schema: {
    email: [
      required('Email é obrigatório'),
      email('Email inválido')
    ],
    password: [
      required('Senha é obrigatória'),
      min(8, 'Mínimo 8 caracteres')
    ]
  }
});
```

#### Regras de Validação Disponíveis
- `required()` - Campo obrigatório
- `email()` - Validação de email
- `min(length)` - Tamanho mínimo
- `max(length)` - Tamanho máximo
- `strongPassword()` - Senha forte
- `confirmPassword()` - Confirmação de senha
- `number()` - Validação de número
- `positiveNumber()` - Número positivo
- `pattern(regex)` - Padrão customizado
- `custom(validator)` - Validação customizada

## 🎯 Hooks Customizados

### `useTransactions`
Hook para gerenciar CRUD completo de transações:
```typescript
const {
  transactions,      // Lista de transações
  isLoading,         // Estado de carregamento
  loadTransactions,  // Recarregar transações
  createTransaction, // Criar nova transação
  updateTransaction, // Atualizar transação
  deleteTransaction, // Deletar transação
} = useTransactions(userId);
```

**Funcionalidades:**
- Carregamento paralelo com `Promise.all`
- Estado de loading integrado
- Recarregamento automático após operações
- Tratamento de erros
- Tipagem completa

### `useModal`
Hook genérico para gerenciar estado de modais:
```typescript
const modal = useModal();

modal.open();   // Abre o modal
modal.close();  // Fecha o modal
modal.toggle(); // Alterna estado
modal.isOpen;   // Estado atual
```

### `useFormValidation`
Hook genérico para validação de formulários com suporte a:
- Validação em tempo real (onChange)
- Validação ao sair do campo (onBlur)
- Validação condicional
- Múltiplas regras por campo

### Outros Hooks
- `useForm` - Gerenciamento de estado de formulários
- `useLocalStorage` - Persistência no localStorage
- `useDevice` - Detecção de dispositivo
- `useLogout` - Logout com limpeza de sessão

## 🎨 Sistema de Design

### Cores
- **Background**: `#04060F`
- **Blue (Primary)**: `#4B5BF5`
- **Actions Blue**: `#283062`
- **Card Blue**: `#1a1f3a`
- **Text White**: `#EDEEFF`
- **Text Gray**: `#535681`
- **Green (Success)**: `#10B981`
- **Red (Error/Danger)**: `#EF4444`

### Ícones Customizados
Todos os ícones seguem a arquitetura do projeto:
- `Arrow` - Setas direcionais
- `Eye` - Visualização
- `Chevron` - Navegação
- `CreditCard` - Transações
- `Edit` - Edição (novo)
- `Trash` - Exclusão (novo)

Cada ícone é um componente React com:
- Props tipadas
- Tamanho customizável
- Classes CSS customizáveis
- Suporte a todas as props SVG nativas

## 📦 Instalação

```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Executar produção
pnpm start
```

## 🔐 Rotas e Autenticação

### Públicas
- `/` - Home
- `/login` - Login
- `/register` - Registro (multi-step)

### Protegidas (requerem autenticação)
- `/dashboard` - Dashboard principal com CRUD de transações

### Sistema de Proteção
O projeto utiliza um **middleware do Next.js** que:
- Verifica a presença de sessão em todas as rotas
- Redireciona usuários não autenticados para `/login`
- Redireciona usuários autenticados de rotas públicas para `/dashboard`
- Preserva a URL de destino para redirecionamento pós-login

### Gerenciamento de Sessão
- Sessões armazenadas em cookies HTTP-only
- Expiração de 7 dias
- Validação automática em cada requisição
- Suporte a logout com limpeza de sessão
- **Dados do usuário salvos no localStorage** para acesso rápido no cliente
- Sincronização entre sessão do servidor e localStorage

## 🌐 Estrutura da API

**Base URL:** `http://localhost:8081/api`

### Autenticação

**GET /usuarios** - Lista usuários (usado para login):
```json
[
  {
    "id": 2,
    "idGrupo": null,
    "nome": "João",
    "email": "joao@email.com",
    "senha": "123"
  }
]
```

**POST /usuarios** - Cria novo usuário:
```json
{
  "nome": "Nome Completo",
  "email": "email@example.com",
  "senha": "senha123",
  "idGrupo": null
}
```

### Transações

**GET /ganhos?idUsuario={id}** - Lista ganhos do usuário:
```json
[
  {
    "id": 1,
    "idUsuario": "2",
    "tipo": "Salário",
    "valor": 5000.0
  }
]
```

**GET /gastos?idUsuario={id}** - Lista gastos do usuário:
```json
[
  {
    "id": 2,
    "idUsuario": "2",
    "tipo": "Aluguel",
    "valor": 1500.0
  }
]
```

**POST /ganhos** - Cria novo ganho:
```json
{
  "idUsuario": "2",
  "tipo": "Freelance",
  "valor": 800.0
}
```

**POST /gastos** - Cria novo gasto:
```json
{
  "idUsuario": "2",
  "tipo": "Mercado",
  "valor": 350.0
}
```

**PATCH /ganhos/{id}** - Atualiza ganho:
```json
{
  "idUsuario": "2",
  "tipo": "Salário Atualizado",
  "valor": 5500.0
}
```

**PATCH /gastos/{id}** - Atualiza gasto:
```json
{
  "idUsuario": "2",
  "tipo": "Aluguel Atualizado",
  "valor": 1600.0
}
```

**DELETE /ganhos/{id}** - Deleta ganho

**DELETE /gastos/{id}** - Deleta gasto

## 🛠️ Utilitários

### HTTP Client
Cliente HTTP customizado com:
- Métodos: GET, POST, PUT, PATCH, DELETE
- Headers padrão
- Tratamento de erros
- Tipagem TypeScript

### Formatadores
- `formatCurrency(value)` - Formata valores monetários (R$ 1.234,56)

### Validadores
- `isValidEmail(email)` - Valida email
- `isStrongPassword(password)` - Valida senha forte
- `isRequired(value)` - Valida campo obrigatório
- `minLength(value, min)` - Valida tamanho mínimo
- `maxLength(value, max)` - Valida tamanho máximo

### Classes CSS
- `cn(...)` - Utilitário para combinar classes CSS (clsx + tailwind-merge)

## 📝 Convenções de Código

### Princípios
1. **Simplicidade** - Código simples e direto
2. **Legibilidade** - Código auto-explicativo
3. **Performance** - Otimização sem sacrificar legibilidade
4. **Manutenibilidade** - Fácil de manter e atualizar
5. **Testabilidade** - Código fácil de testar
6. **Reusabilidade** - Componentes e funções reutilizáveis

### Boas Práticas
- ✅ Utilizar early returns
- ✅ Nomes descritivos para variáveis e funções
- ✅ Funções privadas quando necessário
- ✅ Código DRY (Don't Repeat Yourself)
- ✅ Estilo funcional e imutável
- ✅ Mudanças mínimas de código
- ✅ Comentários JSDoc em funções públicas
- ✅ Separação de responsabilidades
- ✅ Hooks customizados para lógica reutilizável
- ✅ Componentes pequenos e focados

### Ordenação de Funções
Funções ordenadas na ordem em que são chamadas (ex: método principal primeiro, depois métodos auxiliares)

## 🎯 Exemplos de Uso

### Criar uma Transação
```typescript
import { useTransactions } from "@/hooks";

function MyComponent() {
  const { createTransaction } = useTransactions(userId);
  
  const handleCreate = async () => {
    await createTransaction("ganhos", "Freelance", 1000);
  };
}
```

### Usar o Dialog de Confirmação
```typescript
import { ConfirmDialog } from "@/components/molecules";
import { useModal } from "@/hooks";

function MyComponent() {
  const confirmModal = useModal();
  
  return (
    <>
      <button onClick={confirmModal.open}>Deletar</button>
      
      <ConfirmDialog
        isOpen={confirmModal.isOpen}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja deletar?"
        onConfirm={() => {
          // Ação de confirmação
          confirmModal.close();
        }}
        onCancel={confirmModal.close}
        variant="danger"
      />
    </>
  );
}
```

### Usar Ícones Customizados
```typescript
import { Edit, Trash } from "@/icons";

function MyComponent() {
  return (
    <>
      <Edit size={24} className="text-blue-500" />
      <Trash size={20} className="text-red-500" />
    </>
  );
}
```

## 🔑 Variáveis de Ambiente

```bash
NEXT_PUBLIC_API_URL=http://localhost:8081/api  # URL da API backend
```

**Nota:** A URL padrão já está configurada. Você só precisa definir a variável de ambiente se sua API estiver em outra URL.

## 🚀 Melhorias Implementadas

### Performance
- ✅ Carregamento paralelo de transações com `Promise.all`
- ✅ `useCallback` para evitar re-renders desnecessários
- ✅ Estado de loading para melhor UX
- ✅ Componentes otimizados e pequenos

### Arquitetura
- ✅ Separação de responsabilidades (hooks, components, services)
- ✅ Hooks customizados reutilizáveis
- ✅ Componentes desacoplados
- ✅ Clean Architecture
- ✅ Atomic Design

### UX/UI
- ✅ Dialog de confirmação customizado (sem alert nativo)
- ✅ Ícones SVG customizados e escaláveis
- ✅ Feedback visual em todas as ações
- ✅ Estados de loading
- ✅ Páginas de erro amigáveis
- ✅ Design responsivo

### Código
- ✅ TypeScript com tipagem completa
- ✅ Código limpo e manutenível
- ✅ Comentários JSDoc
- ✅ Validação robusta de formulários
- ✅ Tratamento de erros consistente

## 📊 Estatísticas do Projeto

- **Componentes Atoms**: 7
- **Componentes Molecules**: 6
- **Componentes Organisms**: 1
- **Templates**: 5
- **Hooks Customizados**: 8
- **Ícones Customizados**: 6
- **Páginas**: 6
- **Linhas de Código**: ~3.500+

## 🚧 Roadmap Futuro

- [ ] Sistema de aulas
- [ ] Gráficos e relatórios
- [ ] Notificações push
- [ ] Configurações de perfil
- [ ] Recuperação de senha
- [ ] Testes unitários e E2E
- [ ] Modo offline
- [ ] Exportação de dados
- [ ] Categorias de transações
- [ ] Metas financeiras

## 👥 Contribuindo

Este é um projeto acadêmico da FIAP. Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Projeto desenvolvido para a FIAP - Grand Finale

---

**Desenvolvido com ❤️ por estudantes da FIAP**
