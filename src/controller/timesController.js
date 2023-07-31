const userModel = require('../model/userModel');
const timeModel = require('../model/timeModel');
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWTKEY;


const saveEntryExitTime = async (req, res) => {
    const { entryTime, exitTime } = req.body;
    const token = req.headers.authorization;

    if (!token) {
        res.send(401, { error: 'Token de autenticação não fornecido' });
        return;
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {

            return res.send(401, { error: 'Token de autenticação inválido' });
        }

        req.userId = decoded.userId;
    });

    try {
        const result = await timeModel.saveEntryExitTime(req.userId, entryTime, exitTime);
        res.send(201, {
            time: result,
            message: 'Horário de entrada e saída salvo com sucesso' });

    } catch (error) {
        res.send(404, { error: 'Erro ao salvar horário de entrada e saída' });
    }
};

const getEntryExitTimesByDate = async (req, res) => {
    const userId = req.params.userId;
    const date = req.params.date;

    const user = await userModel.findById(userId);

    if (!user) {
        return res.send(404, { error: 'Usuário não encontrado' });
    }

    try {
        const entryExitTimes = await timeModel.getEntryExitTimesByDate(userId, date);
        res.send(200, { entryExitTimes });
    } catch (error) {
        res.send(404, { error: 'Erro ao obter horas de entrada e saída' });
    }
};

const getEntryExitTimesById = async (req, res) => {
    const userId = req.params.userId;

    const user = await userModel.findById(userId);

    if (!user) {
        return res.send(404, { error: 'Usuário não encontrado' });
    }

    try {
        const entryExitTimes = await timeModel.getEntryExitTimesByUserId(userId);
        res.send(200, { entryExitTimes });
    } catch (error) {
        res.send(404, { error: 'Erro ao obter horas de entrada e saída' });
    }
};

const deleteEntryExitTimeById = async (req, res) => {
    const userId = req.params.userId;
    const timeId = req.params.timeId;

    const user = await userModel.findById(userId);
    if (!user) {
        return res.send(404, { error: 'Usuário não encontrado' });
    }

    try {
        await timeModel.deleteEntryExitTimeById(userId, timeId);
        res.send(200, { message: 'Horário de entrada e saída excluído com sucesso' });
    } catch (error) {
        res.send(404, { error: 'Erro ao excluir horário de entrada e saída' });
    }
};

module.exports = {
    saveEntryExitTime,
    getEntryExitTimesByDate,
    deleteEntryExitTimeById,
    getEntryExitTimesById,
};
