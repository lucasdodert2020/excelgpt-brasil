# Banco de Dados

## Objetivo

Definir o modelo inicial para suportar usuários, planos, histórico, uso de IA, cache e monetização.

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
- `createdAt`
- `updatedAt`

### Account e Session

Entidades esperadas pelo Auth.js para autenticação.

### Plan

Representa o plano disponível.

Campos previstos:

- `id`
- `name`
- `slug`
- `monthlyLimit`
- `features`
- `price`
- `createdAt`

### Subscription

Representa assinatura ativa ou passada.

Campos previstos:

- `id`
- `userId`
- `planId`
- `provider`
- `providerCustomerId`
- `providerSubscriptionId`
- `status`
- `currentPeriodStart`
- `currentPeriodEnd`
- `createdAt`
- `updatedAt`

### Conversation

Agrupa mensagens do usuário.

Campos previstos:

- `id`
- `userId`
- `title`
- `excelVersion`
- `createdAt`
- `updatedAt`

### Message

Registra perguntas e respostas.

Campos previstos:

- `id`
- `conversationId`
- `role`
- `content`
- `taskType`
- `excelVersion`
- `createdAt`

### AiUsage

Registra uso de IA e custos estimados.

Campos previstos:

- `id`
- `userId`
- `messageId`
- `model`
- `inputTokens`
- `outputTokens`
- `estimatedCost`
- `createdAt`

### KnowledgeBaseEntry

Base de conhecimento para dúvidas recorrentes.

Campos previstos:

- `id`
- `slug`
- `title`
- `question`
- `answer`
- `excelVersion`
- `tags`
- `isPublic`
- `createdAt`
- `updatedAt`

### CachedAnswer

Cache de respostas reutilizáveis.

Campos previstos:

- `id`
- `cacheKey`
- `questionHash`
- `taskType`
- `excelVersion`
- `answer`
- `hits`
- `createdAt`
- `updatedAt`

## Observações

- O histórico deve ser útil para o usuário, mas não deve armazenar dados sensíveis desnecessários.
- Cache deve considerar tipo de tarefa e versão do Excel.
- A base de conhecimento poderá alimentar páginas públicas de SEO futuramente.

