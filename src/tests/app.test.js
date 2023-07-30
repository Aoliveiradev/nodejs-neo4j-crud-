const request = require('supertest');
const server = require('../app');
const userController = require('../controller/userController');
const timeModel = require("../model/timeModel");


const mockUserController = jest.fn();
mockUserController.mockResolvedValue({
    id: '39b68fc4-15f4-46f3-9c17-d3b03183887f',
    name: 'Alice',
    email: 'alice@example.com',
});

jest.spyOn(userController, 'createUser').mockImplementation(mockUserController);

// Test suite para os testes da rota /users
describe('Testes da rota /users', () => {
    test('Deve responder à rota /users com status 200', async () => {
        const response = await request(server).get('/users');
        expect(response.statusCode).toBe(200);
    });

    test('Deve responder à rota inexistente com status 404', async () => {
        const response = await request(server).get('/rota-inexistente');
        expect(response.statusCode).toBe(404);
    });

    test('Deve responder à rota /users com status 201', async () => {
        const response = await request(server)
            .post('/users')
            .send({ name: 'Alice', email: 'alice@example.com', password: 'secret' });

        expect(response.statusCode).toBe(201);
    });

    test('Deve responder à rota /users com status 400 por não conter um body', async () => {
        const response = await request(server)
            .post('/users')
            .send({});
        expect(response.statusCode).toBe(400);
    });
});
describe('Testes da rota /times', () => {
    test('Deve responder à GET /times/:userId/:date com status 200', async () => {
        const response = await request(server).get('/times/de62b16e-3fd1-4ec4-885b-2fab2c7cd9b2/2023-07-30');
        expect(response.statusCode).toBe(200);
    });

    test('Deve responder inexistente com status 404', async () => {
        const response = await request(server).get('/rota-inexistente');
        expect(response.statusCode).toBe(404);
    });

    test('Deve responder à POST /times com status 201', async () => {
        const response = await request(server)
            .post('/times')
            .send({
                userId: "de62b16e-3fd1-4ec4-885b-2fab2c7cd9b2",
                entryTime: "13:00",
                exitTime: "18:00"
            });

        expect(response.statusCode).toBe(201);
    });

    test('Deve responder à POST /times com status 500 por não conter um body', async () => {
        const response = await request(server)
            .post('/times')
            .send({});
        expect(response.statusCode).toBe(500);
    });

    test('Deve responder à Delete /times com status 500 por não conter dados ou os mesmos estarem errados', async () => {
        const userId = '';
        const timeId = '';

        const response = await request(server).delete(`/times/${userId}/${timeId}`);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error: Erro ao obter usuário no banco de dados');
    });


});



