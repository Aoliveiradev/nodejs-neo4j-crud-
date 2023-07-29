const request = require('supertest');
const server = require('../../app');
const userModel = require('../../model/user');
const { v4: uuidv4 } = require('uuid');
const jest = require('jest-mock')
jest.mock('../../model/user');


test('Deve criar um novo usuário', async () => {
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
});

test('Deve retornar todos os usuários', async () => {
    const usersFromDB = [
        {
            id: uuidv4(),
            name: 'John Doe',
            email: 'john@example.com',
        },
        {
            id: uuidv4(),
            name: 'Jane Smith',
            email: 'jane@example.com',
        },
    ];

    // Mocking the userModel.getUsers function to resolve with the users from DB
    userModel.getUsers.mockResolvedValue(usersFromDB);

    const response = await request(server).get('/users');

    expect(response.status).toBe(200);
    expect(response.body.Users).toEqual(usersFromDB);
});

// // Test for getUserById function
// test('Deve retornar um usuário por ID', async () => {
//     const userId = uuidv4();
//     const userFromDB = {
//         id: userId,
//         name: 'John Doe',
//         email: 'john@example.com',
//     };
//
//     // Mocking the userModel.getUserById function to resolve with the user from DB
//     userModel.getUserById.mockResolvedValue(userFromDB);
//
//     const response = await request(server).get(`/users/${userId}`);
//
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(userFromDB);
// });
//
// // Test for getUserById when user is not found
// test('Deve retornar status 404 quando usuário não é encontrado por ID', async () => {
//     const userId = uuidv4();
//
//     // Mocking the userModel.getUserById function to resolve with null (user not found)
//     userModel.getUserById.mockResolvedValue(null);
//
//     const response = await request(server).get(`/users/${userId}`);
//
//     expect(response.status).toBe(404);
//     expect(response.body.error).toBe('Usuário não encontrado');
// });
