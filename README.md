# API de Gerenciamento de Usuários

Este projeto é uma API Node.js construída utilizando o Restify e o Neo4j para gerenciar dados de usuários. Ela fornece endpoints para criar novos usuários, obter uma lista de usuários e obter um usuário específico pelo ID.

## Configuração do Projeto

1. Clone o repositório para sua máquina local.

2. Instale as dependências do projeto executando o seguinte comando no diretório do projeto:


3. Atualize as credenciais e o URI do banco de dados Neo4j no arquivo `.env`. Certifique-se de fornecer o `NEO4J_URI`, `NEO4J_USERNAME` e `NEO4J_PASSWORD` corretos.

## Conexão com o Banco de Dados Neo4j

O projeto utiliza o banco de dados Neo4j para armazenar e recuperar dados de usuários. A conexão com o banco é estabelecida usando o pacote `neo4j-driver`. As credenciais do banco de dados e o URI são fornecidos através de variáveis de ambiente para garantir a segurança.

O módulo `userModel.js` contém as funções para interagir com o banco de dados Neo4j, como criar um novo usuário, recuperar todos os usuários e encontrar um usuário pelo seu ID.

## Executando o Projeto

Para iniciar o servidor da API, execute o seguinte comando no diretório do projeto:

O servidor será iniciado na porta especificada (padrão é 3000) e estará pronto para receber solicitações.

## Executando os Testes

O projeto inclui testes unitários para o módulo `userController`. Para executar os testes, use o seguinte comando:


Os testes utilizam o Jest como framework de testes e o Supertest para fazer requisições HTTP aos endpoints da API. A função `jest.mock` é utilizada para simular o módulo `userModel` e evitar chamadas reais ao banco de dados durante os testes.

## Dificuldades Encontradas

Uma dificuldade enfrentada durante o projeto foi realizar o downgrade do Restify para uma versão compatível com o Node.js 10.24.1. Como as versões 8.x e posteriores do Restify requerem o Node.js 12 ou superior, foi necessário encontrar e utilizar uma versão anterior (por exemplo, 6.x) para garantir a compatibilidade com o Node.js 10.24.1.

Outro desafio foi configurar e estabelecer a conexão com o banco de dados Neo4j. Garantir que as credenciais e o URI do banco de dados fossem configurados corretamente no arquivo `.env` e assegurar que o pacote `neo4j-driver` fosse instalado e utilizado corretamente foram etapas importantes para estabelecer uma conexão bem-sucedida com o banco de dados.

No geral, o projeto visa fornecer uma API simples para gerenciar dados de usuários utilizando o Restify e o Neo4j. Os testes garantem que os endpoints da API funcionem conforme o esperado e que a conexão com o banco de dados seja tratada adequadamente.
