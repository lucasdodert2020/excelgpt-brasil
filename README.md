# ExcelGPT Brasil

ExcelGPT Brasil é um SaaS profissional de IA especialista em Excel para o público brasileiro. O produto ajuda usuários a gerar, corrigir, explicar e adaptar fórmulas considerando versões reais do Excel usadas no Brasil.

## Missão

Democratizar o uso avançado de Excel no Brasil, entregando respostas claras, confiáveis e compatíveis com o ambiente do usuário, sem tratar o produto como um chatbot genérico.

## Produto

O MVP terá:

- Chat de perguntas sobre Excel.
- Geração de fórmulas.
- Correção de fórmulas.
- Explicação de fórmulas.
- Seletor de versão: Excel 2013, 2016, 2019, 2021, 365 e Google Sheets.
- Histórico de conversas e fórmulas.
- Login.
- Plano gratuito e plano Pro.

## Princípios

- Ser especialista em Excel, não um chatbot genérico.
- Priorizar respostas em português do Brasil.
- Gerar fórmulas compatíveis com Excel em português quando aplicável.
- Considerar diferenças entre versões do Excel e Google Sheets.
- Reduzir chamadas à IA com cache, base de conhecimento e respostas reutilizáveis.
- Preparar o produto para SEO e páginas públicas futuras.
- Monetizar por assinatura recorrente.

## Stack Planejada

- Frontend: Next.js, TypeScript e Tailwind CSS.
- Backend: Next.js API Routes ou Route Handlers.
- Banco de dados: PostgreSQL.
- ORM: Prisma.
- Autenticação: Auth.js.
- IA: OpenAI API.
- Pagamentos: Mercado Pago e Stripe.
- Deploy: Vercel.

## Setup Local

### Requisitos

- Node.js 20 ou superior.
- npm.
- Docker Desktop ou Docker Compose compatível.

### Instalação

```bash
npm install
```

### Variáveis de Ambiente

Copie `.env.example` para `.env` e preencha os valores locais.

Exemplo de `DATABASE_URL` para o PostgreSQL do Docker Compose:

```env
DATABASE_URL="postgresql://excelgpt:excelgpt@localhost:5432/excelgpt_brasil?schema=public"
```

Nunca commite o arquivo `.env`.

### Banco de Dados Local

Suba o PostgreSQL local:

```bash
docker compose up -d
```

Gere o Prisma Client:

```bash
npm run prisma:generate
```

Valide o schema Prisma:

```bash
npm run prisma:validate
```

Crie/aplique migrações em desenvolvimento:

```bash
npm run prisma:migrate
```

### Desenvolvimento

Rode o servidor local:

```bash
npm run dev
```

Acesse `http://localhost:3000`.

### Qualidade

Execute o lint:

```bash
npm run lint
```

Formate os arquivos:

```bash
npm run format
```

## Roadmap Resumido

1. Fundação documental e decisões iniciais.
2. Estrutura base do app.
3. Autenticação e modelo de usuários.
4. Chat MVP com seletor de versão.
5. Geração, correção e explicação de fórmulas.
6. Histórico e limites do plano gratuito.
7. Assinatura Pro.
8. Páginas públicas com foco em SEO.
9. Cache, base de conhecimento e otimização de custos.

## Documentação

A documentação inicial está em `docs/`:

- `01-vision.md`: visão do produto.
- `02-prd.md`: requisitos do produto.
- `03-architecture.md`: arquitetura técnica planejada.
- `04-database.md`: modelo de dados inicial.
- `05-api.md`: desenho inicial da API.
- `06-prompts.md`: estratégia de prompts.
- `07-ui-ux.md`: experiência do usuário.
- `08-design-system.md`: direção visual.
- `09-roadmap.md`: fases de evolução.
- `10-ai-rules.md`: regras de comportamento da IA do produto.
- `11-monetization.md`: planos e monetização.
- `12-seo.md`: estratégia de SEO.
- `13-deployment.md`: deploy e ambientes.
- `14-security.md`: segurança e privacidade.
