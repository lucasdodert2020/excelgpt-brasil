# UI/UX

## Objetivo

Criar uma experiência clara, rápida e confiável para usuários que querem resolver problemas de Excel.

## Princípios de Experiência

- O usuário deve sentir que está falando com um especialista em Excel.
- A interface deve ser objetiva e produtiva.
- O chat deve destacar fórmulas, explicações e avisos de compatibilidade.
- O seletor de versão deve estar sempre visível ou facilmente acessível.
- O plano gratuito deve mostrar limites sem atrapalhar a primeira experiência.

## Telas do MVP

### Página Inicial do Produto

Futura página pública com proposta de valor, exemplos de uso e CTA para começar.

### Login

Fluxo simples usando Auth.js.

### Chat

Elementos principais:

- Campo de mensagem.
- Seletor de versão do Excel.
- Sugestões rápidas: gerar fórmula, corrigir fórmula, explicar fórmula.
- Área de resposta com fórmula em destaque.
- Botão para copiar fórmula.
- Histórico lateral ou acessível por menu.

### Histórico

Deve permitir:

- Ver conversas anteriores.
- Buscar por título ou conteúdo.
- Reabrir uma conversa.
- Excluir conversa.

### Conta e Plano

Deve exibir:

- Plano atual.
- Uso do mês.
- Benefícios do Pro.
- Acesso ao checkout.

## Estados Importantes

- Carregando resposta.
- Resposta vinda do cache.
- Limite gratuito atingido.
- Erro de IA.
- Versão incompatível com fórmula solicitada.

## Tom de Voz

- Claro.
- Profissional.
- Didático.
- Direto.
- Brasileiro, sem excesso de informalidade.

