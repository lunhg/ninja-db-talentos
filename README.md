# ninja-bd-talentos

> API de habilidades ninjas

## Iniciando

### Dependências

Tenha certeza que você tem:

* [NodeJS](https://nodejs.org/) instalado
* [npm](https://www.npmjs.com/) instalado
* [yarn](https://www.yarnpkg.com) instalado
* Um servidor mysql rodando. Você pode habilitar um aqui (https://www.github.com/lunhg/alpine-mariadb)

#### Instalação

##### Node.js

Sugiro você instalar através do [`nvm`](https://github.com/search?utf8=%E2%9C%93&q=nvm)

* [Linux](https://github.com/nvm-sh/nvm)
* [Windows](https://github.com/coreybutler/nvm-windows)

##### NPM

Uma vez instalado o `node`, o `npm` já vem incluído. Para checar execute o seguinte comando (linux):

    $> npm --version

##### Yarn

Yarn é um gerenciador de pacotes bem bacana. Para instalar, execute:

    $> npm install -g yarn
    $> yarn --version
    
##### Dependências do aplicativo

    $> git clone https://github.com/lunhg/ninja-db-talentos.git
    $> cd path/to/ninja-bd-talentos
    $> yarn install

##### Configure a base de dados:

Vá para o arquivo `config/default.json` e procure pelo campo `mysql`; modifique-o de acordo com suas credenciais.

Ex.:

    "mysql": "mysql://<user>:<pwd>@<ip>:3306/<db>"

##### Crie pastas especiais para os testes

    mkdir test/tmp
    mkdir test/tmp/users
    
    
### Execute seu aplicativo

#### Modo dev

    $> npm dev
    
ou

    $> yarn dev
    
#### Modo test

    $> npm test
   
ou

    $> yarn test 
  
e todos os testes na pasta `test/` serão executados.
    
###### Testes individuais:

* `yarn test:health`: verifica se está tudo OK no sistema base;
* `yarn test:users`: cria usuarios;
* `yarn test:areas`: cria areas;
* `yarn test:habilidade`: cria habildades;
* `yarn test:clean`: deleta base de dados de mock (auxiliar para testes);

###### Lint

É recomendado verificação de boas práticas de escrita executando:

    $> yarn lint
    
###### Observações

Quando você executa um teste, você cria, na base de dados e em um arquivo `test/test.db.json`:

* cria usuários `fake`;
* cria áreas `fake`;
* criar habilidades `fake`;
* para limpar dados, é necessário:
  * executar o comando `yarn test:clean` (executado automaticamente com `yarn test`)
  * entrar no `mysql` e executar:
    * `DROP DATABASE <base de dados>`
    * `CREATE DATABASE <base de dados>`

#### Modo produção

    $> npm start

ou

    $> yarn start

## Modelos e serviços

Existem alguns modelos:

* `usuários` estão no caminho `/users`:
  * Tem várias `áreas`;
  * Requer autenticação (email e senha ou token JWT);
* `áreas` estão no caminho `/areas`:
  * Pertencem aos `users` e tem muitas `habilidades`;
  * Requer autenticação (token JWT);
* `habilidades` estão no caminho `/habilidades`:
  * Pertencem às `areas` e tem muitas `linguagens`;
  * Requer autenticação (token JWT);
* `linguagens` estão no caminho `/linguagens`:
  * Pertencem às `habilidades`;
  * Requer autenticação (token JWT);


## Scaffolding

Este projeto é baseado no [Feathers.js](https://docs.feathersjs.com). Ele tem uma interface de linha comando semelhante às aplicações como ruby on rails ou django:

```
$> npm install -g @feathersjs/cli          # Instala Feathers CLI
$> feathers generate service               # Gera um novo serviço
$> feathers generate hook                  # Gera um novo hook
$> feathers help                           # Ver todos os comandos
```

## Changelog

  - 0.0.12: Adicionado teste de POST `/habilidades`; testes com 'mock' através do pacote `lowdb`;
  - 0.0.11: Adicionado teste de POST `/areas`
  - 0.0.10: Adicionado teste de POST `/users` e POST `/authentication` no modo local
  - 0.0.1: Projeto criado e elaborado testes iniciais em usuários
  
## TODO

  - testes para modelo de linguagens
  - testes de GET (all), GET (one), PUT, PATCH e DELETE
  - testes com verificação de email;
  - adicionar docker
  - mudar campo `mysql` para ser preenchido por variáveis de ambiente
