# Golden Raspberry Awards API

Swagger disponível em http://localhost:3000/api

## Description

API RESTful para consultar informações sobre os vencedores da categoria "Pior Filme" do Golden Raspberry Awards. O objetivo principal é fornecer dados sobre os produtores com o maior e menor intervalo entre prêmios consecutivos.

\* A fonte de dados original em formato CSV não fornece dados de categoria, portando a solução considera que TODOS pertencem a categoria **Pior Filme** e dispensa implementação de campos, propriedades, indices e filtros associados a categoria.

\*\* Após obter os vencedores do banco de dados a aplicação executa as regras de negócio para encontrar os produtores com o maior e menor intervalo entre prémios consecutivos, esse processo também poderia incluir uma estrutura mais complexa para o banco de dados com mais tabelas e efetuando os filtros diretamente em uma query por exemplo.

## Settings

As configurações e regras de validação estão centralizadas no arquivo **./src/shared/app-params.ts**.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
