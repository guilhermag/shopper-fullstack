# Backend

Esta pasta contém o código-fonte da aplicação backend, desenvolvida com Node.js, Express e TypeScript.

## Rotas da API

* **`POST /rides/estimate`**
    * **Body:**
        ```json
        {
          "customerId": "string",
          "origin": "string",
          "destination": "string"
        }
        ```
    * **Resposta (sucesso):**
        ```json
        [
          {
            "driver": {
              "id": 1,
              "name": "Homer Simpson",
              // ... outros dados do motorista
            },
            "distance": 1234, // em metros
            "duration": "123s",
            "value": 12.34
          },
          // ... outras estimativas
        ]
        ```
    * **Resposta (erro):**
        ```json
        {
          "error_code": "INVALID_DATA",
          "error_description": "Mensagem de erro"
        }
        ```
* **`PATCH /rides/confirm`**
    * **Body:**
        ```json
        {
          "customerId": "string",
          "driverId": 1,
          "origin": "string",
          "destination": "string",
          "distance": 1234
        }
        ```
    * **Resposta (sucesso):**
        ```json
        {
          "id": 1,
          "date": "2024-11-27T14:30:00.000Z",
          "origin": "string",
          "destination": "string",
          "distance": 1234,
          "duration": "123s",
          "driver": {
            "id": 1,
            "name": "Homer Simpson"
          },
          "value": 12.34
        }
        ```
    * **Resposta (erro):**
        ```json
        {
          "error_code": "INVALID_DATA",
          "error_description": "Mensagem de erro"
        }
        ```
* **`GET /rides/{customer_id}`**
    * **Parâmetros:**
        * `customer_id`: ID do cliente.
        * `driver_id` (opcional): ID do motorista.
    * **Resposta (sucesso):**
        ```json
        {
          "rides": [
            {
              "id": 1,
              "date": "2024-11-27T14:30:00.000Z",
              // ... outros dados da corrida
            },
            // ... outras corridas
          ]
        }
        ```
    * **Resposta (erro):**
        ```json
        {
          "error_code": "INVALID_DATA",
          "error_description": "Mensagem de erro"
        }
        ```

## Como executar o backend localmente

1. Navegue até a pasta `backend`: `cd backend`
2. Instale as dependências: `npm install`
3. Crie o banco de dados e inicie o serviço do prisma: `npm run dev:env:init`
4. Inicie o servidor de desenvolvimento: `npm run dev`
5. Acesse a API em `http://localhost:3333`.

## Observações

* Certifique-se de ter o Node.js e o npm instalados na sua máquina.
* O banco de dados SQLite será criado na pasta `prisma`.
* A API utiliza as variáveis de ambiente definidas no arquivo `.env`, no diretório principal.