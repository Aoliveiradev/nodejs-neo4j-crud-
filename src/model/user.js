const dotenv = require('dotenv');
dotenv.config();
const {v4: uuidv4} = require('uuid');
const neo4j = require("neo4j-driver");

const driver = neo4j.driver(
    `neo4j+s://${process.env.NEO4J_URI}`,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);


const User = {
    createUser: async (name, email, password) => {
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
            const singleRecord = result.records[0]
            return singleRecord.get(0)
        } catch (e) {
            throw new Error(e.message)
        }
    },

    getUsers: async () => {
        try {
            const session = driver.session();
            const result = await session.run(
                'MATCH (n) RETURN n',
            );
            return result.records
        } catch (e) {
            return e
        }
    },


// findById: async (id) => {
    //     try {
    //         const session = driver.session();
    //         const result = await session.run(
    //             'MATCH (user:User) WHERE user.id = $id RETURN user',
    //             {id: id}
    //         );
    //
    //         if (result.records.length === 0) {
    //             throw new restify.errors.NotFoundError('Usuário não encontrado');
    //         }
    //
    //         const user = result.records[0].get('user').properties;
    //         return user;
    //     } catch (error) {
    //         throw new Error('Erro ao obter usuário no banco de dados');
    //     }
    // },
};

module.exports = User;
