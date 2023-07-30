const userModel = require('../model/userModel');

function createUser(req, res, next) {
    const { name, email, password } = req.body;
    userModel.createUser(name, email, password)
        .then(user => {
            res.send(201, { user });
            return next();
        })
        .catch(err => {
            res.send(400, { error: 'Erro ao criar usuário' });
            return next(err);
        });
}

function getUsers(req, res, next) {
    userModel.getUsers()
        .then((result) => {
            res.send(200, result);
            return next();
        })
        .catch((error) => {
            res.send(400, { error: 'Erro ao obter usuários do banco de dados' });
            return next(error);
        });
}

function getUserById(req, res, next) {
    const userId = req.params.id;

    userModel.findById(userId)
        .then((user) => {
            if (!user) {
                res.send(404, { error: 'Usuário não encontrado' });
            } else {
                res.send(200, user);
            }
            return next();
        })
        .catch((error) => {
            res.send(500, { error: 'Usuário não encontrado' });
            return next(error);
        });
}



module.exports = {
    createUser,
    getUsers,
    getUserById
};
