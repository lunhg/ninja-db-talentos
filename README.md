# ninja-bd-talentos

> API de habilidades de membros do midia ninja

## Iniciando

### Dependências

Tenha certeza que você tem:

    - [NodeJS](https://nodejs.org/) instalado
    - [npm](https://www.npmjs.com/) instalado
    - [yarn](https://www.yarnpkg.com) instalado
    - Um servidor mysql rodando. Você pode habilitar um aqui (https://www.github.com/lunhg/alpine-mariadb)
    
#### Instalação

    ```
    cd path/to/ninja-bd-talentos
    npm install
    ```

#### Configure a base de dados:

Vá para o arquivo `config/default.json` e procure pelo campo `mysql`; modifique-o de acordo com suas credenciais.

Ex.:

    "mysql": "mysql://<user>:<pwd>@<ip>:3306/<db>"

#### Crie pastas especiais para os testes

    mkdir test/tmp
    mkdir test/tmp/users
    
### Execute seu aplicativo

    ```
    npm start
    ```

ou

    ```
    yarn start
    ```


## Testing

Execute:

  ```
  npm test
  ``` 
  
ou

  ```
  yarn test
  ``` 
  
e todos os testes na pasta `test/` serão executados.

#### Observações

Quando você executa um teste, você:

* cria usuário `fake` na sua base de dados;
* credenciais `fake` na pasta `test/tmp`;

#### Bibliotecas de testes

Testes são feitos principalmente com os pacotes `mocha`, `chai` e `it-each`. Veja mais detalhes nas documentações específicas.

Os testes são gerenciados pelo arquivo `test/all.js`. 

## Modelos e serviços

Existem alguns modelos:

    - usuários estão no caminho `/users` e reque autenticação (email e senha). Tem várias `areas`;
    - areas estão no caminho `/areas`. Pertencem aos `users` e tem muitas `habilidades`;
    - habilidades estão no caminho `/habilidades`. Pertencem às `areas` e tem muitas `linguagens`
    - linguagens estão no caminho `/linguagens`. Pertencem às `habilidades`;

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Changelog

  - 0.0.1: Projeto criado e elaborado testes iniciais em usuários
  
## TODO

  - testes para modelo de áreas
  - testes para modelo de habilidades
  - testes para modelo de linguagens
  - adicionar docker
  - mudar campo `mysql` para ser preenchido por variáveis de ambiente
