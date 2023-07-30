const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const neo4j = require("neo4j-driver");

dotenv.config();

const driver = neo4j.driver(
    `neo4j+s://${process.env.NEO4J_URI}`,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

const createUser = async (name, email, password) => {
    try {
        const session = driver.session();
        const result = await session.run(
            'CREATE (user:User {id: $userId, name: $name, email: $email, password: $password}) RETURN user',
            {
                userId: uuidv4(),
                name: name,
                email: email,
                password: password,
            }
        );
        const singleRecord = result.records[0];
        return singleRecord.get('user').properties;
    } catch (e) {
        throw new Error(e.message);
    }
};

const getUsers = async () => {
    try {
        const session = driver.session();
        const result = await session.run('MATCH (n) RETURN n');
        const users = result.records.map(record => ({
            id: record.get('n').properties.id,
            name: record.get('n').properties.name,
        }));
        return { Users: users };
    } catch (e) {
        throw new Error('Erro ao obter usuários do banco de dados');
    }
};


const findById = async (id) => {
    try {
        const session = driver.session();
        const result = await session.run(
            'MATCH (user:User) WHERE user.id = $id RETURN user',
            { id: id }
        );

        if (result.records.length === 0) {
            throw new Error('Usuário não encontrado');
        }

        const singleRecord = result.records[0];
        const user = singleRecord.get('user').properties;

        // Criar um novo objeto apenas com as propriedades desejadas
        const userResponse = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        return userResponse;
    } catch (error) {
        throw new Error('Erro ao obter usuário no banco de dados');
    }
};

module.exports = {
    createUser,
    getUsers,
    findById,
};
