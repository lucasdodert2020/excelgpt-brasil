# Deployment

## Objetivo

Definir a direção inicial para ambientes, deploy e operação futura.

## Plataforma Prevista

- Aplicação: Vercel.
- Banco: PostgreSQL gerenciado.
- Pagamentos: Mercado Pago e Stripe.
- IA: OpenAI API.

## Ambientes

### Desenvolvimento

Ambiente local para implementação e testes.

### Preview

Deploy automático por branch ou pull request.

### Produção

Ambiente público estável para usuários reais.

## Variáveis de Ambiente Previstas

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_URL`
- `OPENAI_API_KEY`
- `MERCADO_PAGO_ACCESS_TOKEN`
- `MERCADO_PAGO_WEBHOOK_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Pipeline Futuro

1. Commit no repositório.
2. Verificação de tipos e build.
3. Deploy de preview.
4. Revisão.
5. Merge para branch principal.
6. Deploy de produção.

## Cuidados

- Nunca versionar `.env`.
- Configurar segredos apenas na plataforma de deploy.
- Validar webhooks em produção e preview.
- Ter rollback simples.
- Monitorar erros e custos de IA.

## Observabilidade Inicial

- Logs de erro.
- Métricas de uso da IA.
- Uso por plano.
- Falhas em pagamentos.
- Taxa de cache.

