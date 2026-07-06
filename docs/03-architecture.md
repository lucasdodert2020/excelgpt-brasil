# Arquitetura

## Visão Geral

A arquitetura futura será baseada em Next.js com TypeScript, usando PostgreSQL como banco principal, Prisma como ORM, Auth.js para autenticação, OpenAI API para IA, Mercado Pago e Stripe para pagamentos e Vercel para deploy.

## Componentes

- Frontend web: interface de chat, histórico, páginas públicas e área de conta.
- Backend web: endpoints de chat, usuários, histórico, limites e pagamentos.
- Banco de dados: usuários, conversas, mensagens, planos, assinaturas, cache e base de conhecimento.
- Camada de IA: classificação da tarefa, montagem de prompt, chamada ao modelo e pós-processamento.
- Camada de cache: reutilização de respostas frequentes e redução de custo.
- Pagamentos: gestão de assinatura Pro via Mercado Pago e Stripe.

## Fluxo de Chat

1. Usuário envia pergunta e versão do Excel.
2. Backend valida usuário, plano e limite.
3. Sistema verifica cache/base de conhecimento.
4. Se houver resposta confiável, retorna sem chamar IA.
5. Se não houver, monta prompt especializado.
6. OpenAI API gera resposta.
7. Sistema salva interação, metadados e possível cache.
8. Frontend exibe fórmula, explicação e observações.

## Separação de Responsabilidades

- UI: estados visuais, formulários e navegação.
- Serviços de domínio: regras de plano, limites e histórico.
- Serviço de IA: prompts, cache, segurança e pós-processamento.
- Persistência: Prisma e PostgreSQL.
- Pagamentos: provedores externos isolados por adaptadores.

## Decisões Iniciais

- Next.js será usado como aplicação full-stack.
- TypeScript será obrigatório.
- PostgreSQL será o banco principal.
- Prisma será usado para modelagem e migrações.
- Cache será parte da estratégia desde o início, mesmo que simples no MVP.
- O produto será preparado para páginas públicas SEO desde a arquitetura inicial.

## Riscos

- Custo alto com chamadas à IA.
- Respostas incompatíveis com versões antigas do Excel.
- Complexidade de pagamentos com dois provedores.
- Dados sensíveis enviados pelo usuário no chat.

