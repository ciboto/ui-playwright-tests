# <img src="https://playwright.dev/img/playwright-logo.svg" alt="Playwright Logo" width="40" /> Projeto de Testes Automatizados - Integração API + UI com CI/CD

Este projeto apresenta uma abordagem robusta de testes automatizados, unificando testes de API e interface (UI) em uma única suíte. A integração eficiente entre chamadas de API e interações na interface permite validar fluxos completos de usuário com maior velocidade, estabilidade e cobertura.

Utiliza Playwright para testes E2E, estruturado com o padrão Page Object Model (POM), e oferece suporte a setups rápidos via chamadas de API, otimizando o tempo de execução. A automação está integrada ao GitHub Actions, garantindo execução contínua e confiável em pipelines de CI.

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

- 🎭 [**Playwright**](https://playwright.dev/) — Framework para testes E2E com suporte multi-browser 
- 🔌 **pw-api-plugin** — Plugin que exibe chamadas HTTP na UI do Playwright, útil para configurar e depurar testes.
- 🧪 **GitHub Actions** — integração contínua (CI)
- 💻 **Node.js** — ambiente de execução JavaScript
- 🧾 TypeScript — Superset do JavaScript que adiciona tipagem estática e outros recursos ao
---
## 📁 Estrutura do Projeto
```ui-playwright-tests/
├── .github/
│   └── workflows/
│       └── playwright.yml          # Workflow CI para GitHub Actions
├── helpers/                        # Utilitários e helpers
├── node_modules/                   # Dependências instaladas pelo npm
├── pages/                          # Páginas POM organizadas por funcionalidade
│   └── basePage.ts                 # Classe base para todas as páginas
├── playwright-report/              # Relatórios gerados pelo Playwright
├── test-results/                   # Resultados e logs de testes
├── tests/                          # Casos de testes (API + UI)
│   ├── api-ui-flows.spec.ts
│   ├── login.spec.ts
│   ├── place-order.spec.ts
│   └── register-account.spec.ts
├── .gitignore                     # Arquivos e pastas ignorados pelo Git
├── package.json                   # Dependências e scripts npm
├── playwright.config.ts           # Configurações do Playwright
└── README.md                      # Documentação do projeto
```
---
## 🚀 Start
### Pré-requisitos

- Node.js versão 20 ou superior  
- npm ou yarn  

### Instalação
1. Clone o repositório
```bash
git clone https://github.com/ciboto/api-playwright-tests.git
cd api-playwright-tests
```
2. Instale as dependências:
```bash
npm install
npx playwright install
```
---
### Como rodar localmente os testes:
1. Rode os testes com interface UI e logs API ativados para facilitar debug:
```bash
LOG_API_UI=true LOG_API_REPORT=true npx playwright test --ui
#OU
npm run test:ui
```
2. Rodar todos os testes no modo headless (sem abrir o navegador):
```bash
npx playwright test
```
3. Rodar os testes em um navegador específico:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```
4. Rodar testes por nome do arquivo, describe ou título do teste:
```bash
npx playwright test login.spec.ts
npx playwright test -g "Place Order with Success"
```
5. 🏷️ Rodar testes com tag @grep
Você pode usar tags nos testes (ex: @login, @order, etc.) com a flag --grep:
```bash
npx playwright test --grep "@errorLogin"
```

## 👀 Abrir o relatório de testes
1. Para ver o report
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
          LOG_API_REPORT: 'true'   # ativa geração de relatório detalhado
        run: npx playwright test

      - name: Upload Playwright report artifacts
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```
