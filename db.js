var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dbUser:dbUserPassword@cluster0.wtnp6.mongodb.net/tecweb-db?retryWrites=true&w=majority');



var userSchema = new mongoose.Schema({

	username: String,
	password: String
	// stock:[{ticker: String, price: Number}]
}, {collection: 'usercollection'}
);


module.exports = { Mongoose: mongoose, UserSchema: userSchema }

