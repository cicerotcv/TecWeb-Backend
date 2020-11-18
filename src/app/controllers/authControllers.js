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
router.post('/signin', function (req, res) {
    const { username, password } = req.body;
    User.findOne({ username, password }, function (err, doc) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        } else if (doc.length === 0) {
            res.json({ login: false });
            return;
        } else {
            res.json({ login: true, user: doc });
            res.end();
        }
    });
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
