# desafiopubfuture
## version 1

#### data 06/01/2022
* [X] Versionamento com Git 
* [X] Configuração ambiente de desevolvimento

#### 07/01/2022

* [X] Definição do servidor local
* [x] Instalação das bibliotecas
* [X] Preparação dos modelos  de dados
* [x] Preparação das rotas


#### 08/01/2022

* [x] Estrutura dos métodos (lógica dos dados) 
* [x] Criar Crud (RECEITAS) - valor / dataRecebimento / dataRecebimentoEsperado / descrição / conta / tipoReceita (salário, presente, prêmio, outros)
* [X] Filtro por tipo de receita e por data final e inicial

#### 09/01/2022

* [ ] Estrutura dos métodos (lógica dos dados)
* [X] Criar Crud (Despesas) -valor / dataPagamento / dataPagamentoEsperado / tipoDespesa (alimentação, educação, lazer, moradia, roupa, saúde, transporte, outros) conta
* [X] Filtro por tipo de receita e por data final e 

#### 10/01/2022

* [ ] Estrutura dos métodos (lógica dos dados)
* [X] Criar Crud (Contas)
* [X] Transferir Saldo entre contas / listar saldo total


#### 11/01/2022

* [X] Testes Unitários (cada função)

#### 12/01/2022 e 13/01/2022

* [X] Finalização de DDD (reestruturando o código)

______________________________________________________________________________________________________________________________________

DOCUMENTAÇÃO:

- Preparação de ambiente desenvolvimento e testes;

Instale um bando de dados compatível com Sequelize (ORM), nesse projeto foi utilizado o MYSQL version:8.0.27.1 disponível em (https://dev.mysql.com/downloads/file/?id=508935 ) essa aplicação foi desenvolvida em Java script, utilizando o Node versão 16.13.1 disponível em (https://nodejs.org/en/ ), NPM versão ... e para criar e testar as rotas foi utilizado o Insomnia versão 2021.7.2.0 disponível em (https://insomnia.rest/download ) essa ferramenta é responsável por receber e enviar requisições em http e testar as API’s.
No seu terminal utilize o comando $ npm install Express, a biblioteca Express será utilizada para subir o servidor local e testar as rotas utilizadas, depois insira o comando $ npm install Body-parser, essa biblioteca vai converter os dados da requisição para arquivos do tipo Json. Depois insira o comando $ npm install sequelize sequelize-cli path, O sequelize é usado para instalar e usar os métodos da ferramenta responsável por toda comunicação com o banco de dados, e o sequelize-cli serve para usarmos alguns recursos de linha de comando que o sequelize tem.
