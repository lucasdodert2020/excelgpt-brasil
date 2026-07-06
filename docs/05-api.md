# API

## Objetivo

Definir uma proposta inicial de endpoints para o MVP e orientar a futura implementação.

## Padrões

- Respostas em JSON.
- Validação de entrada em todos os endpoints.
- Autenticação obrigatória para histórico, conta e plano Pro.
- Limites por usuário, plano e IP.
- Nenhuma chave de IA deve ser exposta ao frontend.

## Endpoints Iniciais

### `POST /api/chat`

Envia pergunta para o assistente de Excel.

Entrada prevista:

```json
{
  "message": "Como faço um PROCV?",
  "excelVersion": "excel_365",
  "taskType": "question"
}
```

Saída prevista:

```json
{
  "answer": "Resposta em português do Brasil",
  "formula": "=PROCV(...)",
  "notes": ["Observação sobre compatibilidade"],
  "source": "ai_or_cache"
}
```

### `POST /api/formulas/generate`

Gera fórmula a partir de uma descrição.

### `POST /api/formulas/fix`

Corrige fórmula enviada pelo usuário.

### `POST /api/formulas/explain`

Explica fórmula enviada pelo usuário.

### `GET /api/conversations`

Lista histórico do usuário autenticado.

### `GET /api/conversations/:id`

Retorna conversa específica.

### `DELETE /api/conversations/:id`

Remove conversa do histórico.

### `GET /api/me`

Retorna dados básicos da conta e plano.

### `GET /api/usage`

Retorna uso do plano no período atual.

### `POST /api/billing/checkout`

Cria sessão de pagamento para plano Pro.

### `POST /api/webhooks/mercado-pago`

Recebe eventos do Mercado Pago.

### `POST /api/webhooks/stripe`

Recebe eventos da Stripe.

## Tipos de Tarefa

- `question`
- `generate_formula`
- `fix_formula`
- `explain_formula`

## Versões Suportadas

- `excel_2013`
- `excel_2016`
- `excel_2019`
- `excel_2021`
- `excel_365`
- `google_sheets`

