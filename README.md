# Literando

Projeto desenvolvido para um desafio técnico em 2024, onde foi executado o desenvolvimento de um sistema para gerenciar lista de desejos para leituras de livros.

`Demo`: [portfolio.oseiasromeiro.social/literando/](https://portfolio.oseiasromeiro.social/literando/)

## Desenvolvimento

### Tecnologias
Tecnologias utilizadas durante o desenvolvimento e integrado ao sistema.

- [Angular CLI](https://github.com/angular/angular-cli) na versão 18.2.4
- Versionamento com [Git](https://git-scm.com/)
- IDE [Visual Studio Code](https://code.visualstudio.com)
- Integração com a API do [Google Books](books.google.com)
- Testes unitários com [Karma](https://karma-runner.github.io)
- Armazenamento em localStorage do navegador

### Funcionalidades

- Encontrar bibliotecas de livros
- Pesquisar por livros
- Otimizar buscas com filtros, ordenação e restrições
- Favoritar livros adicionando avaliação, tags e anotações
- Buscar seus favoritos e filtrar por tags criadas
- Remover livros dos favoritos
- Uso da aplicação sem a necessidade de autenticação
- Interface responsiva para diferentes tamanhos de telas

### Melhorias
Algumas melhorias podem ser adicionadas para esta aplicação, mas que não foram desenvolvidas por questão de tempo necessário e para simplificação da execução

- autenticação de usuários
- integração com um serviço de backend
- sincronização de dados (e.g. favoritos) com a conta do usuário
- maior segurança ao utilizar um backend como proxy para comunicar com a api do google

## Servindo aplicação
Para subir a aplicação utilize o comando:

```sh
npm start
```

> Acesse via [http://localhost:4200/](http://localhost:4200/)

## Testando aplicação
Diversos testes unitários foi escrito para garantir o desenvolvimento dos requisitos do desafio e a corretude das principais funcionalidades do sistema. Você pode executar os testes da seguinte forma:

```sh
npm test
```
