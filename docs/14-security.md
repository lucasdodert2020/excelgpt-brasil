# Segurança

## Objetivo

Definir princípios iniciais de segurança e privacidade para o ExcelGPT Brasil.

## Princípios

- Proteger dados de usuários.
- Reduzir coleta desnecessária.
- Não expor segredos.
- Validar entradas.
- Aplicar limites para evitar abuso.
- Tratar dados enviados no chat com cuidado.

## Autenticação

- Usar Auth.js.
- Proteger rotas privadas.
- Validar sessão no backend.
- Não confiar apenas no frontend.

## Dados Sensíveis

Usuários podem colar dados reais de planilhas no chat. O produto deve:

- Evitar solicitar dados sensíveis.
- Alertar quando possível.
- Não armazenar planilhas completas no MVP.
- Permitir exclusão de histórico.
- Minimizar dados enviados à IA.

## Segredos

- Chaves de API devem ficar apenas no backend.
- `.env` não deve ser versionado.
- Webhooks devem validar assinatura.
- Logs não devem incluir tokens ou segredos.

## Abuso e Limites

- Limites por plano.
- Rate limit por usuário e IP.
- Proteção contra spam.
- Monitoramento de uso anormal.

## IA

- Validar e limitar tamanho de mensagens.
- Evitar prompt injection afetando regras internas.
- Não permitir que usuário altere identidade do assistente.
- Separar prompt de sistema de conteúdo do usuário.
- Registrar metadados de uso sem armazenar dados sensíveis desnecessários.

## Pagamentos

- Confirmar assinatura por webhook.
- Não liberar Pro apenas por retorno do frontend.
- Armazenar apenas identificadores necessários dos provedores.
- Tratar falhas de pagamento com status claro.

