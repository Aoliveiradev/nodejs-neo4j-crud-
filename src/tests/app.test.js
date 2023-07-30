const request = require('supertest');
const server = require('../app');
const userController = require('../controller/userController');


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

