# CineMania - Frontend para Arquitetura de Microsserviços

Frontend React otimizado para integração com a arquitetura de microsserviços do CineMania.

## 📋 Estrutura do Projeto

```
cinemania/
├── client/
│   ├── src/
│   │   ├── pages/              # Páginas principais (Home, Movies, MovieDetails, Login, Profile)
│   │   ├── components/         # Componentes reutilizáveis (Navbar, Footer, MovieCard, etc)
│   │   ├── services/           # Serviços de API (integração com Gateway)
│   │   ├── types/              # Tipos TypeScript compartilhados
│   │   ├── contexts/           # React Contexts (Autenticação, Tema)
│   │   ├── hooks/              # Custom Hooks
│   │   ├── lib/                # Utilitários
│   │   ├── App.tsx             # Roteamento principal
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Estilos globais (Tailwind + Tema)
│   ├── public/                 # Arquivos estáticos
│   └── index.html              # HTML template
├── package.json                # Dependências
├── vite.config.ts              # Configuração Vite com proxy para API
├── tsconfig.json               # Configuração TypeScript
└── README_MICROSERVICES.md     # Este arquivo
```

## 🚀 Início Rápido

### 1. Instalar Dependências
```bash
pnpm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL da API Gateway (padrão: http://localhost:8080/api)
VITE_API_URL=http://localhost:8080/api

# Outras variáveis conforme necessário
VITE_APP_NAME=CineMania
```

### 3. Iniciar Servidor de Desenvolvimento
```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`

### 4. Build para Produção
```bash
pnpm build
```

## 🔗 Integração com API Gateway

O frontend está configurado para consumir a API Gateway do CineMania através do serviço centralizado em `client/src/services/api.ts`.

### Endpoints Disponíveis

#### Filmes
- `GET /api/movies` - Listar todos os filmes
- `GET /api/movies/{id}` - Obter detalhes de um filme
- `POST /api/movies` - Criar novo filme (admin)
- `PUT /api/movies/{id}` - Atualizar filme (admin)
- `DELETE /api/movies/{id}` - Deletar filme (admin)

#### Sessões
- `GET /api/sessions` - Listar sessões
- `GET /api/movies/{movieId}/sessions` - Listar sessões de um filme
- `GET /api/sessions/{id}` - Obter detalhes de uma sessão

#### Autenticação
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/logout` - Fazer logout
- `GET /api/auth/profile` - Obter perfil do usuário

#### Reservas
- `GET /api/bookings` - Listar reservas do usuário
- `POST /api/bookings` - Criar nova reserva
- `DELETE /api/bookings/{id}` - Cancelar reserva

### Exemplo de Uso

```typescript
import { movieService } from '@/services/api';

// Buscar todos os filmes
const response = await movieService.getAll();
const movies = response.data;

// Buscar filme por ID
const movie = await movieService.getById('1');
```

## 📁 Páginas Implementadas

### Home (`/`)
- Hero banner com filme em destaque
- Seção de filmes em cartaz
- Categorias de filmes
- Newsletter

### Movies (`/movies`)
- Catálogo completo de filmes
- Filtros por gênero
- Busca por título
- Ordenação (popularidade, avaliação, título)

### Movie Details (`/movie/:id`)
- Detalhes completo do filme
- Sinopse, elenco, diretor
- Trailer (modal)
- Botão para reservar ingressos

### Login (`/login`)
- Formulário de autenticação
- Validação de credenciais
- Armazenamento de token JWT

### Profile (`/profile`)
- Informações do usuário
- Edição de perfil
- Histórico de reservas

### Not Found (`/404`)
- Página de erro 404

## 🎨 Design e Tema

O projeto utiliza:
- **Framework CSS**: Tailwind CSS 4
- **Componentes UI**: shadcn/ui
- **Tema**: Dark mode com paleta ouro/preto/cinza
- **Tipografia**: Playfair Display (títulos) + Inter (corpo)

## 🔐 Autenticação

O token JWT é armazenado em `localStorage` e automaticamente adicionado aos headers de todas as requisições através do interceptor em `client/src/services/api.ts`.

```typescript
// Exemplo de login
const { token, user } = await authService.login(email, password);
localStorage.setItem('authToken', token);
```

## 📦 Dependências Principais

- **React 19** - Framework UI
- **Vite 7** - Build tool
- **TypeScript 5.6** - Tipagem
- **Tailwind CSS 4** - Estilos
- **Wouter** - Roteamento
- **Axios** - HTTP client
- **Zustand** - State management
- **Recharts** - Gráficos
- **Lucide React** - Ícones
- **shadcn/ui** - Componentes UI

## ✅ Checklist de Desenvolvimento

- [x] Estrutura base do projeto
- [x] Integração com API Gateway
- [x] Páginas principais (Home, Movies, MovieDetails)
- [x] Autenticação (Login, Profile)
- [x] Tema dark com Tailwind CSS
- [x] Componentes reutilizáveis
- [x] Serviço centralizado de API
- [ ] Testes unitários
- [ ] Testes E2E
- [ ] Documentação de componentes

## 🐛 Troubleshooting

### Erro de CORS
Se receber erro de CORS ao chamar a API:
1. Verifique se o API Gateway está rodando em `http://localhost:8080`
2. Confirme a URL em `VITE_API_URL`
3. Verifique as configurações de CORS no API Gateway

### Servidor não inicia
```bash
# Limpar cache e reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Porta 3000 já em uso
```bash
# Vite automaticamente encontrará a próxima porta disponível
pnpm dev
```

## 📝 Notas Importantes

- O frontend foi otimizado para consumir a API Gateway
- Páginas de Booking, Checkout, MyTickets e Admin foram removidas (serão gerenciadas por microsserviços)
- O serviço de API em `client/src/services/api.ts` centraliza todas as chamadas HTTP
- Todos os tokens de autenticação são gerenciados automaticamente
- O proxy Vite redireciona requisições `/api` para o Gateway

## 🔄 Próximos Passos

1. Integrar com o API Gateway em produção
2. Implementar testes unitários e E2E
3. Adicionar cache de dados com React Query
4. Implementar PWA (Progressive Web App)
5. Otimizar performance com code splitting
6. Adicionar analytics e monitoramento

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação dos microsserviços ou abra uma issue no repositório.
