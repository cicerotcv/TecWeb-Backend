var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* GET user list */

router.get('/userlist', function(req, res) {
	var db = require("../db")
	var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
	Users.find({}).lean().exec(
		function(e, docs){
			res.json(docs);
			res.end();
		})
});


/* login info */

router.post('/login', function(req,res,next){
	
	var db = require("../db")
	var User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
	var user = req.body;

	User.find(user, function(err,doc){
		if (err) {
			res.status(500).json({error:err.message});
			res.end();
			return;
		}else if (doc.length === 0){
			res.json({login: false});
			return
		}else{
			res.json({login: true});
			
			res.end();

		}
	})
})
/* Sign Up */
router.post('/signup', function(req, res, next){
	var db = require("../db")
	var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
	var user = new Users({username: req.body.username, password: req.body.password});
		user.save(function(err){
		if (err) {
			res.status(500).json({error: err.message});
			res.end();
			return;
		}
		res.json(user);
		res.end;
	})
})


module.exports = router;
