# Golden Raspberry Awards API

## Description

API RESTful para consultar informações sobre os indicados e vencedores da categoria "Pior Filme" do Golden Raspberry Awards. O objetivo principal é fornecer dados sobre os produtores com o maior e menor intervalo entre prêmios consecutivos.

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

## Checklist de Desenvolvimento

- [x] A aplicação deve conter um readme com instruções para rodar o projeto e os testes de integração.

- [ ] Ler o arquivo CSV dos filmes e inserir os dados em uma base de dados ao iniciar a aplicação.

- [ ] Obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que obteve dois prêmios mais rápido, seguindo a especificação de formato definida na

- [ ] O web service RESTful deve ser implementado com base no nível 2 de maturidade de Richardson;

- [ ] Devem ser implementados somente testes de integração. Eles devem garantir que os dados obtidos estão de acordo com os dados fornecidos na proposta;

- [ ] O banco de dados deve estar em memória utilizando um SGBD embarcado (por exemplo, H2). Nenhuma instalação externa deve ser necessária;

- [ ] O código-fonte deve ser disponibilizado em um repositório git (Github, Gitlab, Bitbucket, etc).
