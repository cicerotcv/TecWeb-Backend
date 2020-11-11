var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root123@cluster0.wtnp6.mongodb.net');



var userSchema = new mongoose.Schema({

	username: String,
	password: String
	// stock:[{ticker: String, price: Number}]
}, {collection: 'usercollection'}
);


module.exports = { Mongoose: mongoose, UserSchema: userSchema }

