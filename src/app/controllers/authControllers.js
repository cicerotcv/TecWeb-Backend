const express = require('express');
const router = express.Router();

const User = require('../models/user');

/* GET user list */
router.get('/', async (req, res) => {
    await User.find({})
        .lean()
        .exec(function (e, docs) {
            res.json(docs);
            res.end();
        });
});

/* Login */
router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        // se username ou password em branco
        if (!username || !password) {
            return res.json({
                login: false,
                message: 'Username ou Password não preenchido'
            });
        }
        // busca de user no banco de dados
        const user = await User.findOne({ username, password });
        // se user não existir
        if (!user) {
            return res.json({ login: false });
        }
        // se user existir
        return res.json({ login: true, user });
    } catch (e) {
        console.log(e);
        return res.status(400).send({ error: 'Não foi possível fazer login' });
    }
});

/* Sign Up */
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body; // obtemos os dados de cadastro de req.body

        // se já existir um usuário com esse username,
        // devemos interromper o fluxo do programa;
        if (await User.findOne({ username })) {
            return res.status(403).json({ error: 'Usuário já existe' });
        }
        // caso contrário, criamos um novo usuário
        const newUser = new User({
            username,
            password
        });
        // salvamos ele no banco de dados;
        newUser.save(function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            newUser.password = undefined; // ocultar o password do usuário
            res.json(newUser);
            res.end;
        });
    } catch (err) {
        return res.send({ error: 'Problema ao cadastrar' });
    }
});

// delete account
router.delete('/:id', async (req, res) => {
    const _id = req.params.id;

    await User.findByIdAndDelete(_id).exec((err) => {
        if (err) {
            return res
                .status(400)
                .send({ error: 'Problema ao deletar usuário', login: true });
        }

        return res.send({ login: false });
    });

    // return res.json({ _id });
});

module.exports = router;
