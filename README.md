# Projeto Qualicorp-backend-nodeJS-neo4j-restify-restfull

Este projeto é uma aplicação simples para gerenciar horários de entrada e saída de usuários. A aplicação utiliza o Node.js com o framework Restify e o banco de dados Neo4j para armazenar os dados dos usuários e seus respectivos horários.

## Instalação e Execução

1. Clone o repositório para o seu computador.
2. Instale as dependências do projeto com o comando: 
`npm install`
3. Certifique-se de que o banco de dados Neo4j está configurado corretamente e acessível através das variáveis de ambiente `NEO4J_URI`, `NEO4J_USERNAME` e `NEO4J_PASSWORD`.
4. Para iniciar o servidor, execute:
`npm start`
5. O servidor estará disponível na porta 5000. Você pode acessar a API através do endereço `http://localhost:5000`.

## Funcionalidades

### 1. Cadastro de Usuários

Permite criar um novo usuário informando seu nome, e-mail e senha através da rota `/users` utilizando o método POST. Exemplo de requisição:

POST http://localhost:5000/users

`{
 "name": "John Doe",
 "email": "john@example.com",
 "password": "secret"
}`

A resposta será o usuário criado com sucesso ou uma mensagem de erro caso ocorra algum problema.

### 2.Listagem de Usuários
Permite listar todos os usuários cadastrados através da rota /users utilizando o método GET. 

Exemplo de requisição:
`GET http://localhost:5000/users`

A resposta será uma lista com todos os usuários cadastrados.

### 3. Horários de Entrada e Saída
Permite que um usuário salve seus horários de entrada e saída através da rota /times utilizando o método POST. `Exemplo de requisição:
POST http://localhost:5000/times

`{
    "userId": "de62b16e-3fd1-4ec4-885b-2fab2c7cd9b2",
    "entryTime": "09:00",
    "exitTime": "17:00"
}`

A resposta será uma mensagem indicando que os horários foram salvos com sucesso.

### 4. Listagem de Horários por Data
Permite listar os horários de entrada e saída de um usuário por data específica através da rota /times/:userId/:date utilizando o método GET. Exemplo de requisição:

`GET http://localhost:5000/times/de62b16e-3fd1-4ec4-885b-2fab2c7cd9b2/2023-07-30`

A resposta será uma lista com os horários de entrada e saída do usuário para a data informada.

### 5.Exclusão de Horário
Permite excluir um horário de entrada e saída de um usuário pelo seu ID através da rota `/times/:userId/:timeId` utilizando o método `DELETE`. 

Exemplo de requisição:

`http://localhost:5000/times/de62b16e-3fd1-4ec4-885b-2fab2c7cd9b2/1a2b3c4d-5e6f-7g8h-9i10j-11k12l13m14n`

A resposta será uma mensagem indicando que o horário foi excluído com sucesso.

# Testes Unitários
Foram implementados testes unitários utilizando a biblioteca Jest e o Supertest para garantir o correto funcionamento das rotas e dos controllers. Os testes estão organizados em diferentes suítes de teste para cada rota e controller da aplicação.

Os testes abordam cenários de sucesso e de erro, verificando as respostas das requisições e o comportamento correto dos controllers diante das chamadas.

# Melhorias Futuras
Implementar autenticação e autorização para proteger as rotas sensíveis.
Implementar validação dos dados enviados nas requisições para evitar erros e garantir a integridade dos dados no banco de dados.
Melhorar o tratamento de erros e mensagens de erro para fornecer informações mais detalhadas em caso de falhas.
Adicionar mais funcionalidades à aplicação, como a possibilidade de atualizar os horários de entrada e saída e obter relatórios de horas trabalhadas por período.
Implementar testes de integração para garantir a integridade das rotas e suas interações com o banco de dados.
Este projeto tem como objetivo fornecer uma base inicial para a gestão de horários de entrada e saída de usuários, mas é importante lembrar que pode ser expandido e melhorado de acordo com as necessidades específicas do seu caso de uso.

# Dificuldades e Facilidades
Durante o desenvolvimento deste projeto, algumas dificuldades foram encontradas e superadas com dedicação e pesquisa. As principais dificuldades incluíram:

Configuração do Ambiente: No início do projeto, foi necessário configurar corretamente o ambiente de desenvolvimento, incluindo a instalação das dependências do Node.js 10.24.1, Restify 9.1.0 e Neo4j 2.0.0, neo4j-driver 5.11.0. Além disso, foi preciso garantir que o banco de dados Neo4j estivesse configurado adequadamente com as variáveis de ambiente corretas.

Integração do Neo4j com o Node.js: Integrar o banco de dados Neo4j com o Node.js foi um desafio. Foi necessário aprender a utilizar o pacote neo4j-driver para estabelecer a conexão com o banco de dados e realizar operações usando a linguagem Cypher. Com a pesquisas e leitura da documentação, foi possível compreender a estrutura e sintaxe das consultas Cypher e executar operações CRUD no banco de dados.

Criação das Rotas e Controllers: A criação das rotas e controllers para as funcionalidades de cadastro de usuários e horários de entrada e saída exigiu um entendimento claro do fluxo de dados e da lógica de negócio. A utilização do framework Restify facilitou a organização das rotas e a definição dos endpoints para as diferentes funcionalidades.

Testes Unitários: Foi fundamental implementar testes unitários para verificar o correto funcionamento das funcionalidades. A biblioteca Jest em conjunto com Supertest foi utilizada para criar testes que validassem as respostas das requisições e o comportamento esperado das funções.

Tratamento de Erros: Garantir o tratamento adequado de erros e a geração de mensagens de erro claras foi uma preocupação constante. Foi importante implementar respostas adequadas para as requisições, informando o estado correto da aplicação em caso de sucesso ou falha, todavia é necessário ter um olhar mais cuidadoso com o tratamento de errors para quando for consumido pelo front-end.
