# Grand Finale - Plataforma de Educação Financeira

Aplicação web desenvolvida em Next.js focada em educação financeira, permitindo que usuários gerenciem suas finanças, definam objetivos e acompanhem transações.

## 🚀 Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização
- **React Hooks** - Gerenciamento de estado
- **Sistema de Autenticação** - Login e registro com sessões

## 📁 Arquitetura

O projeto segue os princípios de **Clean Architecture** e **Atomic Design**:

```
src/
├── app/                    # Rotas e páginas (App Router)
│   ├── (auth)/            # Rotas de autenticação
│   │   ├── login/
│   │   └── register/
│   └── (protected)/       # Rotas protegidas
│       └── dashboard/
├── components/            # Componentes (Atomic Design)
│   ├── atoms/            # Componentes básicos
│   ├── molecules/        # Combinações de atoms
│   └── organisms/        # Componentes complexos
├── templates/            # Templates de páginas
├── hooks/                # Custom hooks
├── utils/                # Utilitários e helpers
├── constants/            # Constantes da aplicação
├── types/                # Definições de tipos TypeScript
├── icons/                # Componentes de ícones
├── lib/                  # Bibliotecas e configurações
└── providers/            # Context providers
```

## 🎨 Atomic Design

### Atoms
- `Button` - Botões com variantes (primary, outline, back)
- `Input` - Campos de entrada com validação
- `Text` - Componente de texto tipográfico
- `Progress` - Barra de progresso
- `Chip` - Tags selecionáveis
- `Card` - Container com variantes (default, primary, gradient)
- `IconButton` - Botões circulares com ícones

### Molecules
- `ChipGroup` - Grupo de chips selecionáveis
- `BalanceCard` - Card de exibição de saldo
- `RegistryCard` - Card para registros
- `TransactionItem` - Item de transação

### Organisms
- `TransactionList` - Lista de transações

## 🔧 Funcionalidades

### Autenticação
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

### Dashboard
- Visualização de saldo total
- Registro de ganhos e gastos
- Lista de últimas transações
- Seção de aulas (em desenvolvimento)

### Validação de Formulários
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

### `useFormValidation`
Hook genérico para validação de formulários com suporte a:
- Validação em tempo real (onChange)
- Validação ao sair do campo (onBlur)
- Validação condicional
- Múltiplas regras por campo

### `useForm`
Hook para gerenciamento de estado de formulários

### `useToggle`
Hook para gerenciar estados booleanos

### `useLocalStorage`
Hook para persistência no localStorage

### `useTheme`
Hook para gerenciamento de tema

### `useDevice`
Hook para detecção de dispositivo

### `useLogout`
Hook para realizar logout com limpeza de sessão e localStorage

## 🎨 Sistema de Design

### Cores
- **Background**: `#04060F`
- **Blue (Primary)**: `#4B5BF5`
- **Actions Blue**: `#283062`
- **Card Blue**: `#1a1f3a`
- **Text White**: `#EDEEFF`
- **Text Gray**: `#535681`

### Gradientes
- **Card Gradient**: `linear-gradient(95.6deg, #4B5BF5 0%, #2C358F 100%)`

### Bordas
- `rounded-12px`: 0.75rem
- `rounded-36px`: 2.25rem
- `rounded-100px`: 6.25rem

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
- `/dashboard` - Dashboard principal

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

## 🛠️ Utilitários

### Formatadores
- `formatCurrency(value)` - Formata valores monetários

### Validadores
- `isValidEmail(email)` - Valida email
- `isStrongPassword(password)` - Valida senha forte
- `isRequired(value)` - Valida campo obrigatório
- `minLength(value, min)` - Valida tamanho mínimo
- `maxLength(value, max)` - Valida tamanho máximo

### Classes CSS
- `cn(...)` - Utilitário para combinar classes CSS

## 📝 Convenções de Código

### Princípios
1. **Simplicidade** - Código simples e direto
2. **Legibilidade** - Código auto-explicativo
3. **Performance** - Otimização sem sacrificar legibilidade
4. **Manutenibilidade** - Fácil de manter e atualizar
5. **Testabilidade** - Código fácil de testar
6. **Reusabilidade** - Componentes e funções reutilizáveis

### Boas Práticas
- Utilizar early returns
- Nomes descritivos para variáveis e funções
- Funções privadas quando necessário
- Código DRY (Don't Repeat Yourself)
- Estilo funcional e imutável
- Mudanças mínimas de código
- Comentários JSDoc em funções

### Ordenação de Funções
Funções ordenadas na ordem em que são chamadas (ex: método `execute` primeiro, depois métodos auxiliares)

## 🔑 Sistema de Login

### Fluxo de Autenticação

1. **Login**:
   - Usuário insere email e senha
   - Validação de campos no frontend
   - GET na API para buscar listagem de usuários
   - Verificação de email e senha na listagem
   - Criação de sessão com dados do usuário
   - **Salvamento dos dados no localStorage**
   - Redirecionamento para dashboard

2. **Registro**:
   - Step 1: Validação de dados pessoais
   - Step 2: Seleção de objetivos (mínimo 1)
   - Step 3: Validação de senha e confirmação
   - Envio de dados para API
   - Criação automática de sessão
   - **Salvamento dos dados no localStorage**
   - Redirecionamento para dashboard

3. **Proteção de Rotas**:
   - Middleware verifica sessão em todas as rotas
   - Rotas protegidas redirecionam para login se não autenticado
   - Layout protegido valida sessão no servidor

### Estrutura de Autenticação

```typescript
// Server Actions (src/lib/auth/actions.ts)
loginAction(credentials)      // Realiza login
registerAction(data)          // Realiza registro
logoutAction()               // Realiza logout

// Gerenciamento de Sessão (src/lib/auth/session.ts)
getSession()                 // Obtém sessão atual
createSession(user)          // Cria nova sessão
deleteSession()              // Remove sessão
isAuthenticated()            // Verifica autenticação

// Gerenciamento de LocalStorage (src/lib/auth/storage.ts)
saveUserToLocalStorage(user)     // Salva dados do usuário
getUserFromLocalStorage()        // Obtém dados do usuário
removeUserFromLocalStorage()     // Remove dados do usuário

// Serviço de API (services/auth/auth.tsx)
authService.login(email, password)           // GET /usuarios - Busca usuário na listagem
authService.register(name, email, password)  // POST /usuarios - Cria novo usuário

// Hook de Logout (src/hooks/useLogout.ts)
useLogout()                  // Hook para logout com limpeza de localStorage
```

### Estrutura da API

**Base URL:** `http://localhost:8081/api`

**GET /usuarios** - Retorna listagem de usuários para validação:
```json
[
  {
    "id": 2,
    "idGrupo": null,
    "nome": "João",
    "email": "joao@email.com",
    "senha": "123"
  },
  {
    "id": 3,
    "idGrupo": null,
    "nome": "Maria",
    "email": "maria@email.com",
    "senha": "456"
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

### Exemplo de Uso do LocalStorage

```typescript
// Em qualquer componente client-side
import { getUserFromLocalStorage } from "@/lib/auth/storage";

function MyComponent() {
  const user = getUserFromLocalStorage();
  
  if (user) {
    console.log(user.id);    // ID do usuário
    console.log(user.name);  // Nome do usuário
    console.log(user.email); // Email do usuário
  }
}

// Para fazer logout
import { useLogout } from "@/hooks";

function LogoutButton() {
  const { logout } = useLogout();
  
  return (
    <button onClick={logout}>
      Sair
    </button>
  );
}
```

### Variáveis de Ambiente

```bash
NEXT_PUBLIC_API_URL=http://localhost:8081/api  # URL da API backend
```

**Nota:** A URL padrão já está configurada como `http://localhost:8081/api` no código. Você só precisa definir a variável de ambiente se sua API estiver em outra URL.

## 🚧 Em Desenvolvimento

- Sistema de aulas
- Gráficos e relatórios
- Notificações
- Configurações de perfil
- Recuperação de senha

## 📄 Licença

Projeto desenvolvido para a FIAP - Grand Finale

