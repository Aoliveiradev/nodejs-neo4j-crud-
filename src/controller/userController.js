const userModel = require('../model/user')
function createUser(req, res, next) {
    const { name, email, password } = req.body;

    userModel.createUser(name, email, password)
        .then(user => {
            res.send(201, { user: user });
            return next();
        })
        .catch(err => {
            res.send(400, { error: err.message });
            return next(err);
        });
}
function getUsers(req, res, next) {
    userModel.getUsers()
        .then((result) => {
            const users = result.map((record) => {
                const user = record.get('n').properties;
                return { id: user.id, name: user.name };
            });

            const response = { Users: users };
            res.send(200, response);
            return next();
        })
        .catch((error) => {
            res.send(500, { error: 'Erro ao obter usuários do banco de dados' });
            return next(error);
        });
}

function getUserById(req, res, next) {
    const userId = req.params.id;

    userModel.getUserById(userId)
        .then((user) => {
            if (!user) {
                res.send(404, { error: 'Usuário não encontrado' });
            } else {
                res.send(200, user);
            }
            return next();
        })
        .catch((error) => {
            res.send(500, { error: 'Erro ao obter usuário do banco de dados' });
            return next(error);
        });
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
};
