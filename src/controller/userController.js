const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWTKEY;

function createUser(req, res, next) {
    const {firstName, lastName, email, password} = req.body;
    const errors = [];

    if (!firstName) {
        errors.push('firstName');
    }
    if (!lastName) {
        errors.push('lastName');
    }
    if (!email) {
        errors.push('email');
    }
    if (!password) {
        errors.push('password');
    }

    if (errors.length > 0) {
        res.send(400, {error: 'Campos obrigatórios não preenchidos', missingFields: errors});
        return next();
    }

    userModel.findByEmail(email)
        .then(existingUser => {
            if (existingUser) {
                res.send(400, {error: 'E-mail já existe', field: 'email'});
                return next();
            }

            userModel.createUser(firstName, lastName, email, password)
                .then(user => {
                    res.send(201, {user});
                    return next();
                })
                .catch(err => {
                    res.send(500, {error: 'Erro ao criar usuário'});
                    return next(err);
                });
        })
        .catch(err => {
            res.send(500, {error: 'Email em uso'});
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
            res.send(400, {error: 'Erro ao obter usuários do banco de dados'});
            return next(error);
        });
}

function getUserById(req, res, next) {
    const userId = req.params.id;

    userModel.findById(userId)
        .then((user) => {
            if (!user) {
                res.send(404, {error: 'Usuário não encontrado'});
            } else {
                res.send(200, user);
            }
            return next();
        })
        .catch((error) => {
            res.send(500, {error: 'Usuário não encontrado'});
            return next(error);
        });
}
function verifyJwt(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        res.send(401, { error: 'Token de autenticação não fornecido' });
        return next();
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            res.send(401, { error: 'Token de autenticação inválido' });
            return next();
        }

        req.userId = decoded.userId;
        return res.send(200, {userId: decoded.userId});
    });
}

function login (req, res, next) {
    const email = req.params.email;
    const password = req.params.password;

    userModel.findByEmail(email)
        .then(user => {
            if (!user) {
                res.send(404, { error: 'Usuário não encontrado' });
                return next();
            }

            userModel.verifyPassword(user, password)
                .then(isPasswordValid => {
                    if (!isPasswordValid) {
                        res.send(401, { error: 'Senha incorreta' });
                        return next();
                    }

                    const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, { expiresIn: '1h' });


                    return res.send(200, { success: true, token: token });
                })
                .catch(error => {
                    res.send(500, { error: 'Erro ao realizar o login' });
                    return next(error);
                });
        })
        .catch(error => {
            res.send(500, { error: 'Erro ao realizar o login' });
            return next(error);
        });
}



module.exports = {
    createUser,
    getUsers,
    getUserById,
    login,
    verifyJwt
};
