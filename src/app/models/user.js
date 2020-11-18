const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // garante que não pode haver repetição
    },
    password: {
        type: String,
        required: true
    }
});
// antes de salvar um usuário no banco de dados,
// vamos encriptar a senha para que a informação
// não fique exposta caso o banco seja "violado"
UserSchema.pre('save', async function (next) {
    // como funciona o bcrypt:
    // https://medium.com/reprogramabr/uma-breve-introdução-sobre-bcrypt-f2fad91a7420
    const salt = 10;
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
