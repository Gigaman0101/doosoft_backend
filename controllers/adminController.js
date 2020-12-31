const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const targetAdmin = await db.Admin.findOne({ where: { username } });

        if (targetAdmin) {
            res.status(400).send({ message: "already have admin username" })
        } else {
            const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
            const hashedPwd = bcryptjs.hashSync(password, salt);
            const newAdmin = await db.Admin.create({
                username,
                password: hashedPwd
            });

            res.status(201).send({ message: "Admin Created." })
        };
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    };
};

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const targetAdmin = await db.Admin.findOne({ where: { username } });

        if (!targetAdmin) {
            res.status(400).send({ message: "username or password incorrect" })
        } else {
            const isCorrect = bcryptjs.compareSync(password, targetAdmin.password);
            if (isCorrect) {
                const payload = {
                    id: targetAdmin.id,
                    username: targetAdmin.username,
                };
                const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 });
                res.status(200).send({ token });
            } else {
                res.status(400).send({ message: "username or password incorrect" })
            };
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin
}