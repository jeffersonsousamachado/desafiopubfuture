# desafiopubfuture


## Versão atual: 1.0

#### Inicializando o projeto
#### Ambiente de Desenvolvimento

##### * Fazendo download do NodeJs LTS
[NodeJs LTS](https://nodejs.org/en/) para windows 10 64bit
```
Node versão 16.13.1 disponível em (https://nodejs.org/en/ )
```

##### * Criando banco de dados de desenvolvimento e teste
[MySQL: Version 8](https://dev.mysql.com/downloads/file/?id=508935) para Windows10 64bit
```
MySQL: Version 8 (https://dev.mysql.com/downloads/file/?id=508935 )

CREATE DATABASE finance default character set utf8 default collate utf8_generate_ci;
CREATE DATABASE test_finance default character set utf8 default collate utf8_generate_ci;
```

##### * Ferramente de trabalho para uso da API
[Insomnia](https://insomnia.rest/download)
```
Insomnia versão 2021.7.2.0 disponível em (https://insomnia.rest/download )
```

##### * Fazendo download do projeto
```
git clone https://github.com/jeffersonsousamachado/desafiopubfuture.git
ou
git clone git@github.com:jeffersonsousamachado/desafiopubfuture.git
```

##### * Acessando o diretório do projeto e instalando as dependências
```
cd desafiopubfuture
npm install
or 
yarn install
```

##### * Fazendo a migração do banco de dados com Bibliotéca Sequelize
```
sequelize init 
sequelize db:migrate
sequelize migration:generate --name tb-contas
sequelize migration:generate --name tb-receitas
sequelize migration:generate --name tb-despeas
```

##### * Rodar o projeto em modo de desenvolvimento
```
npm run dev
```

##### * Rodar o projeto em modo de test
```
npm run prepare:test
npm run test
```

### Observações:

É necessário criar um arquivo `.env` com as configurações default para acesso ao banco de dados local

______________________________________________________________________________________________________________________________________

## Descrição:

Desafio Pub Future: foi proposto a criação de um serviço API `Application Programming Interface` Rest Full `Representational State Transfer`, para controle financeiro pessoal ao qual foi atribuito algumas funcionalidades:
* [x] criar, listar, atualizar e remover contas; `CRUD create, read, update deletar`
* [x] criar, listar, atualizar e remover despesas; `CRUD create, read, update deletar`
* [x] criar, listar, atualizar e remover receitas; `CRUD create, read, update deletar`
* [x] fazer transferência entre contas;
* [x] Filtro por (data,tipo receitas, tipo despesas, filtro por tipo de contas);
* [X] saldo total
