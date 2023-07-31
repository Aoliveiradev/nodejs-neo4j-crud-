const request = require('supertest');
const server = require('../../app');
const timeModel = require('../../model/timeModel');
const userModel = require('../../model/userModel');
const { v4: uuidv4 } = require('uuid');
jest.mock('../../model/timeModel');
jest.mock('../../model/userModel');

describe('Testes da rota /times', () => {
    test('Deve criar um novo horário de entrada e saída', async () => {
        const userData = {
            id: 'de62b16e-3fd1-4ec4-885b-2fab2c7cd9b2',
        };

        const timeData = {
            userId: userData.id,
            entryTime: '09:00',
            exitTime: '17:00',
        };

        userModel.findById.mockResolvedValue(userData.id);
        timeModel.saveEntryExitTime.mockResolvedValue({
            id: uuidv4(),
            userId: userData.id,
            entryTime: timeData.entryTime,
            exitTime: timeData.exitTime,
        });

        const response = await request(server)
            .post('/times')
            .send(timeData, {});

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Horário de entrada e saída salvo com sucesso');
        expect(response.body.time).toEqual(expect.objectContaining({
            id: expect.any(String),
            userId: timeData.userId,
            date: expect.any(String),
            entryTime: timeData.entryTime,
            exitTime: timeData.exitTime,
        }));
    });

    test('Deve retornar os horários de entrada e saída por data e usuário', async () => {
        const userId = 'de62b16e-3fd1-4ec4-885b-2fab2c7cd9b2';
        const date = '2023-07-30';

        const entryExitTimes = [
            {
                id: uuidv4(),
                userId: userId,
                date: date,
                entryTime: '09:00',
                exitTime: '17:00',
            },
            {
                id: uuidv4(),
                userId: userId,
                date: date,
                entryTime: '10:00',
                exitTime: '18:00',
            },
        ];

        userModel.findById.mockResolvedValue({ id: userId });
        timeModel.getEntryExitTimesByDate.mockResolvedValue(entryExitTimes);

        const response = await request(server).get(`/times/${userId}/${date}`);

        expect(response.status).toBe(200);
        expect(response.body.entryExitTimes).toEqual(expect.arrayContaining(entryExitTimes));
    });

});
