const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const neo4j = require("neo4j-driver");

dotenv.config();

const driver = neo4j.driver(
    `neo4j+s://${process.env.NEO4J_URI}`,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

const mapUserProperties = (userNode) => {
    const user = userNode.properties;
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
    };
};

const createUser = async (firstName, lastName, email, password) => {
    try {
        const session = driver.session();
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await session.run(
            'CREATE (user:User {id: $userId, firstName: $firstName, lastName: $lastName, email: $email, password: $password}) RETURN user',
            {
                userId: uuidv4(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
            }
        );

        const singleRecord = result.records[0];
        return mapUserProperties(singleRecord.get('user'));
    } catch (error) {
        throw new Error('Erro ao criar usuário no banco de dados');
    }
};

const getUsers = async () => {
    try {
        const session = driver.session();
        const result = await session.run('MATCH (n:User) RETURN n');
        const users = result.records.map(record => mapUserProperties(record.get('n')));
        return { Users: users };
    } catch (error) {
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
        return mapUserProperties(singleRecord.get('user'));
    } catch (error) {
        throw new Error('Erro ao obter usuário no banco de dados');
    }
};

const findByEmail = async (email) => {
    try {
        const session = driver.session();
        const result = await session.run(
            'MATCH (user:User) WHERE user.email = $email RETURN user',
            { email: email }
        );

        if (result.records.length === 0) {
            return null;
        }

        const singleRecord = result.records[0];
        return mapUserProperties(singleRecord.get('user'));
    } catch (error) {
        throw new Error('Erro ao obter usuário no banco de dados');
    }
};

const verifyPassword = async (user, password) => {
    try {
        return await bcrypt.compare(password, user.password);
    } catch (error) {
        throw new Error('Erro ao verificar a senha do usuário');
    }
};

module.exports = {
    createUser,
    getUsers,
    findById,
    findByEmail,
    verifyPassword
};
