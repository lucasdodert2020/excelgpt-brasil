# AI Rules do Projeto

Este arquivo define regras obrigatórias para qualquer IA, Codex ou agente automatizado que trabalhe no projeto ExcelGPT Brasil.

## Regras Gerais

- Escrever documentação, mensagens e textos de produto em português do Brasil.
- Tratar o projeto como um SaaS profissional.
- Não transformar o produto em chatbot genérico.
- Manter o foco em Excel, fórmulas, planilhas, automação e dúvidas relacionadas.
- Não criar funcionalidades fora do escopo sem decisão explícita.
- Não instalar dependências sem solicitação ou aprovação.
- Não criar app Next.js antes da fase definida no roadmap.
- Não criar código de aplicação durante a fase documental.

## Regras de Produto

- Toda resposta do produto deve considerar a versão selecionada pelo usuário.
- As versões suportadas no MVP são: Excel 2013, 2016, 2019, 2021, 365 e Google Sheets.
- Quando o usuário pedir fórmula para Excel em português, usar nomes de funções em português.
- Quando houver diferença entre versões, explicar a limitação de forma objetiva.
- Sempre que possível, oferecer alternativa compatível com versões antigas.
- Evitar respostas vagas; entregar fórmula, explicação e observações práticas.

## Regras Técnicas Futuras

- Stack planejada: Next.js, TypeScript, Tailwind, PostgreSQL, Prisma, Auth.js, OpenAI API, Mercado Pago, Stripe e Vercel.
- Priorizar código simples, tipado e legível.
- Separar regras de negócio, chamadas à IA, autenticação, pagamentos e persistência.
- Preparar o sistema para cache de respostas e base de conhecimento.
- Registrar decisões importantes em documentação antes de grandes mudanças.

## Regras de IA e Custo

- Reduzir chamadas desnecessárias à OpenAI API.
- Usar cache para perguntas, fórmulas e explicações recorrentes.
- Antes de chamar IA, verificar se a resposta pode vir da base de conhecimento.
- Guardar metadados mínimos para auditoria: tipo de tarefa, versão do Excel, tokens estimados e usuário.
- Não armazenar planilhas completas no MVP sem necessidade clara e consentimento.

## Regras de Segurança

- Nunca expor chaves de API no frontend.
- Nunca commitar segredos, tokens ou arquivos `.env`.
- Validar entrada do usuário antes de enviar para serviços externos.
- Aplicar limites por plano, usuário e IP quando necessário.
- Evitar armazenar dados sensíveis enviados no chat.

## Regras de Entrega

- Toda alteração deve respeitar a documentação existente.
- Se uma implementação contradizer a documentação, atualizar a documentação ou pedir decisão.
- Preferir entregas pequenas, revisáveis e alinhadas ao roadmap.
- Não adicionar dependências sem justificar o motivo.

