# Banco de Dados

## Objetivo

Definir o modelo inicial do MVP para suportar usuários, autenticação futura com Auth.js, histórico de conversas, mensagens, cache de IA, logs de uso e favoritos.

## Tecnologia Prevista

- Banco: PostgreSQL.
- ORM: Prisma.

## Entidades Iniciais

### User

Representa o usuário da plataforma.

Campos previstos:

- `id`
- `name`
- `email`
- `emailVerified`
- `image`
- `role`: `USER` ou `ADMIN`
- `plan`: `FREE`, `PRO` ou `BUSINESS`
- `createdAt`
- `updatedAt`

Relacionamentos:

- `accounts`
- `sessions`
- `conversations`
- `usageLogs`
- `favorites`

Índices:

- `role`
- `plan`
- `createdAt`

### Account

Entidade compatível com Auth.js para provedores externos de autenticação.

Campos principais:

- `userId`
- `type`
- `provider`
- `providerAccountId`
- `refresh_token`
- `access_token`
- `expires_at`
- `token_type`
- `scope`
- `id_token`
- `session_state`

Regras:

- `provider` + `providerAccountId` devem ser únicos.
- Ao excluir usuário, contas vinculadas são removidas em cascata.

### Session

Entidade compatível com Auth.js para sessões persistidas.

Campos principais:

- `sessionToken`
- `userId`
- `expires`

### VerificationToken

Entidade compatível com Auth.js para fluxos de verificação.

Campos principais:

- `identifier`
- `token`
- `expires`

### Conversation

Agrupa mensagens do usuário.

Campos previstos:

- `id`
- `userId`
- `title`
- `mode`: `FORMULA`, `EXPLAIN`, `FIX`, `CONVERT`, `VBA`, `POWER_QUERY` ou `OFFICE_SCRIPT`
- `excelVersion`
- `createdAt`
- `updatedAt`

Índices:

- `userId`
- `userId` + `updatedAt`
- `mode`
- `excelVersion`

### Message

Registra perguntas e respostas.

Campos previstos:

- `id`
- `conversationId`
- `role`
- `content`
- `metadata`
- `createdAt`

Índices:

- `conversationId`
- `conversationId` + `createdAt`
- `role`

### AiCache

Cache de respostas reutilizáveis para reduzir chamadas à IA.

Campos previstos:

- `id`
- `cacheKey`
- `questionHash`
- `answer`
- `mode`
- `excelVersion`
- `hitCount`
- `createdAt`
- `updatedAt`

Índices:

- `questionHash`
- `mode`
- `excelVersion`
- `mode` + `excelVersion`
- `updatedAt`

### UsageLog

Registra eventos de uso e custo estimado.

Campos previstos:

- `id`
- `userId`
- `action`
- `tokensUsed`
- `costInCents`
- `createdAt`

Observações:

- `userId` é opcional para permitir logs de eventos anônimos ou pré-login.
- `tokensUsed` e `costInCents` são opcionais porque nem toda ação consome IA.

### Favorite

Permite que o usuário favorite mensagens úteis.

Campos previstos:

- `id`
- `userId`
- `messageId`
- `createdAt`

Regras:

- Um usuário não pode favoritar a mesma mensagem mais de uma vez.

## Observações

- O histórico deve ser útil para o usuário, mas não deve armazenar dados sensíveis desnecessários.
- Cache deve considerar modo de uso e versão do Excel.
- O modelo de assinatura detalhado ainda não foi implementado; no MVP inicial, o plano fica no enum `UserPlan`.
- Login, chat e chamadas à OpenAI ainda não estão implementados nesta fase.
