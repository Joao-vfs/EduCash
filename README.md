# Grand Finale - Plataforma de Educação Financeira

Aplicação web desenvolvida em Next.js focada em educação financeira, permitindo que usuários gerenciem suas finanças, definam objetivos e acompanhem transações.

## 🚀 Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização
- **React Hooks** - Gerenciamento de estado
- **Next Auth** - Autenticação (preparado)

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
- Login de usuários
- Registro em múltiplas etapas:
  - Step 1: Dados pessoais (nome, sobrenome, email)
  - Step 2: Seleção de objetivos financeiros
  - Step 3: Definição de senha

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

## 🔐 Rotas

### Públicas
- `/` - Home
- `/login` - Login
- `/register` - Registro

### Protegidas
- `/dashboard` - Dashboard principal

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

## 🚧 Em Desenvolvimento

- Sistema de aulas
- Integração com backend
- Gráficos e relatórios
- Notificações
- Configurações de perfil

## 📄 Licença

Projeto desenvolvido para a FIAP - Grand Finale

