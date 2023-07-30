const neo4j = require('neo4j-driver');
const { v4: uuidv4 } = require('uuid');

const driver = neo4j.driver(
    `neo4j+s://${process.env.NEO4J_URI}`,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

const Time = {
    saveEntryExitTime: async (userId, entryTime, exitTime) => {
        const session = driver.session();
        const timeId = uuidv4();
        const date = new Date().toISOString().slice(0, 10); // Use the current date in ISO format (YYYY-MM-DD)

        try {
            const result = await session.run(
                `MATCH (user:User {id: $userId})
                CREATE (time:Time {id: $timeId, userId: $userId, date: $date, entryTime: $entryTime, exitTime: $exitTime})
                MERGE (user)-[:HAS_TIME]->(time)
                RETURN time`,
                {
                    userId: userId,
                    timeId: timeId,
                    date: date,
                    entryTime: entryTime,
                    exitTime: exitTime,
                }
            );

            if (result.records.length === 0) {
                throw new Error('Erro ao salvar horário de entrada e saída');
            }

            const singleRecord = result.records[0];
            return singleRecord.get('time').properties;
        } finally {
            await session.close();
        }
    },

    getEntryExitTimesByDate: async (userId, date) => {
        const session = driver.session();

        try {
            const result = await session.run(
                `MATCH (user:User {id: $userId})-[:HAS_TIME]->(time:Time {date: $date})
                RETURN time`,
                {
                    userId: userId,
                    date: date,
                }
            );

            return result.records.map((record) => record.get('time').properties);
        } finally {
            await session.close();
        }
    },

    deleteEntryExitTimeById: async (userId, timeId) => {
        const session = driver.session();

        try {
            await session.run(
                `MATCH (user:User {id: $userId})-[r:HAS_TIME]->(time:Time {id: $timeId})
                DELETE r, time`,
                {
                    userId: userId,
                    timeId: timeId,
                }
            );
        } finally {
            await session.close();
        }
    },
};

module.exports = Time;
