const request = require('supertest');
const server = require('../../app');
const userModel = require('../../model/user');
const { v4: uuidv4 } = require('uuid');
jest.mock('../../model/user');

describe('Testes do userController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Deve criar um novo usuário com sucesso', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };

        const createdUser = {
            id: uuidv4(),
            name: userData.name,
            email: userData.email,
        };

        userModel.createUser.mockResolvedValue(createdUser);

        const response = await request(server)
            .post('/users')
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body.user).toEqual(createdUser);
        expect(userModel.createUser).toHaveBeenCalledTimes(1);
        expect(userModel.createUser).toHaveBeenCalledWith(
            userData.name,
            userData.email,
            userData.password
        );
    });

    test('Deve retornar um erro ao criar um novo usuário', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        };

        const errorMessage = 'Erro ao criar usuário';
        userModel.createUser.mockRejectedValue(new Error(errorMessage));

        const response = await request(server)
            .post('/users')
            .send(userData);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe(errorMessage);
        expect(userModel.createUser).toHaveBeenCalledTimes(1);
        expect(userModel.createUser).toHaveBeenCalledWith(
            userData.name,
            userData.email,
            userData.password
        );
    });

    test('Deve retornar um erro ao obter todos os usuários', async () => {
        const errorMessage = 'Erro ao obter usuários do banco de dados';
        userModel.getUsers.mockRejectedValue(new Error(errorMessage));

        const response = await request(server).get('/users');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe(errorMessage);
        expect(userModel.getUsers).toHaveBeenCalledTimes(1);
    });

    test('Deve retornar um usuário por ID com sucesso', async () => {
        const userId = uuidv4();
        const userFromDB = {
            id: userId,
            name: 'John Doe',
            email: 'john@example.com',
        };

        userModel.findById.mockResolvedValue(userFromDB);

        const response = await request(server).get(`/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(userFromDB);
        expect(userModel.findById).toHaveBeenCalledTimes(1);
        expect(userModel.findById).toHaveBeenCalledWith(userId);
    });

    test('Deve retornar um erro ao obter um usuário por ID', async () => {
        const userId = uuidv4();
        const errorMessage = 'Usuário não encontrado';
        userModel.findById.mockRejectedValue(new Error(errorMessage));

        const response = await request(server).get(`/users/${userId}`);

        expect(response.status).toBe(500);
        expect(response.body.error).toBe(errorMessage);
        expect(userModel.findById).toHaveBeenCalledTimes(1);
        expect(userModel.findById).toHaveBeenCalledWith(userId);
    });

    test('Deve retornar status 404 ao não encontrar um usuário por ID', async () => {
        const userId = uuidv4();
        userModel.findById.mockResolvedValue(null);

        const response = await request(server).get(`/users/${userId}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Usuário não encontrado');
        expect(userModel.findById).toHaveBeenCalledTimes(1);
        expect(userModel.findById).toHaveBeenCalledWith(userId);
    });
});
