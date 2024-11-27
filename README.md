# Shopper Fullstack - Aplicação de Corridas

Este projeto consiste em uma aplicação web para simulação de corridas de táxi, desenvolvida como parte de um teste técnico.

## Funcionalidades

* Solicitação de corridas com cálculo de estimativa de preço e tempo.
* Escolha do motorista com base nas estimativas.
* Confirmação da corrida e registro no histórico.
* Visualização do histórico de corridas.

## Tecnologias Utilizadas

* **Frontend:** React, TypeScript, Tailwind CSS, Google Maps JavaScript API
* **Backend:** Node.js, Express, TypeScript, Prisma ORM, SQLite, Google Maps Routes API

## Estrutura do Projeto

O projeto está dividido em duas pastas principais:

* **`frontend`:** Contém o código-fonte da aplicação frontend.
    * Consulte o README do frontend para mais detalhes: [frontend/README.md](frontend/README.md)
* **`backend`:** Contém o código-fonte da aplicação backend.
    * Consulte o README do backend para mais detalhes: [backend/README.md](backend/README.md)

## Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente:

* **`GOOGLE_API_KEY`:**  Sua chave da API do Google Maps.

## Docker

O projeto utiliza o Docker para facilitar a execução e o deploy da aplicação.

* **`Dockerfile`:** Define as instruções para construir as imagens Docker do frontend e backend.
* **`docker-compose.yml`:**  Orquestra os serviços do frontend e backend, incluindo o mapeamento de portas e as variáveis de ambiente.

## Como executar o projeto

1. Clone o repositório: `git clone <URL_DO_REPOSITORIO>`
2. Crie um arquivo `.env` na raiz do projeto com a variável `GOOGLE_API_KEY`.
3. Execute `docker-compose up -d` para iniciar a aplicação.
4. Acesse o frontend em `http://localhost`.

## Observações

* Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.
* Consulte os READMEs do frontend e backend para obter mais detalhes sobre a execução e a configuração de cada aplicação.