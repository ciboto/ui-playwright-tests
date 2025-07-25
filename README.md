# Projeto de Testes Automatizados - Integração API + UI com CI/CD

Este projeto demonstra uma abordagem avançada de testes automatizados, combinando testes de API e UI em uma mesma suíte. A integração perfeita entre chamadas API e interações de interface garante uma cobertura completa dos fluxos de usuário, além de facilitar a manutenção e acelerar a execução dos testes.

---

## Diferenciais do projeto

- **Integração API + UI em um único fluxo de teste**  
  Criação de usuários, autenticação e operações via API, seguida de validações e interações na interface, permitindo testar cenários reais completos de ponta a ponta.

- **Uso do [pw-api-plugin](https://github.com/sclavijosuero/pw-api-plugin)**  
  Plugin que captura todas as chamadas API durante os testes Playwright e gera relatórios visuais detalhados com logs, payloads, status e timing, facilitando a análise e depuração.

- **Geração de relatórios HTML interativos**  
  Visualize em tempo real no Playwright UI as chamadas API feitas junto com os passos da UI, garantindo transparência total em todo o fluxo de testes.

- **Reuso e organização do código**  
  Funções reutilizáveis para criar dados via API, armazenar localmente e consumir nos testes UI, facilitando o desenvolvimento de novos cenários e aumentando a robustez dos testes.

- **Flexibilidade para rodar em diferentes ambientes, incluindo CI/CD**  
  Funções e configuração preparadas para rodar em pipelines de integração contínua, garantindo qualidade constante em múltiplos ambientes.

---

## Tecnologias utilizadas

- [Playwright](https://playwright.dev/) - Framework para testes E2E com suporte multi-browser  
- [pw-api-plugin](https://github.com/sclavijosuero/pw-api-plugin) - Plugin para captura e relatório de chamadas API  
- [Faker](https://fakerjs.dev/) - Geração de dados falsos realistas para testes  
- Node.js e TypeScript

---

## Como rodar os testes localmente

1. Clone o repositório  
2. Instale as dependências:
```bash
npm install
```
3. Rode os testes com interface UI e logs API ativados para facilitar debug:
```bash
LOG_API_UI=true LOG_API_REPORT=true npx playwright test --ui
```
4. Para ver o report
```bash
npx playwright show-report
```
---
## Rodando no CI/CD
**.github/workflows/playwright.yml**, Como Usar:
- A cada push ou pull request na branch main, os testes rodam automaticamente.
- Você pode rodar manualmente pelo botão Run workflow na aba Actions do GitHub graças ao workflow_dispatch.
- O relatório fica disponível como artefato para download no final do job.

```bash
name: Playwright Tests

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  workflow_dispatch:    # Permite execução manual via GitHub UI

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js environment
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run Playwright tests
        env:
          LOG_API_UI: 'true'       # ativa painel de logs API no UI
          LOG_API_REPORT: 'true'   # ativa geração de relatório detalhado
        run: npx playwright test

      - name: Upload Playwright report artifacts
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```
