/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Successfully Connected to Database!!")
	  // we're connected!
	});

var UserTableSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	email_id: { type: String, required: true, unique: true },
	//member_since: new Date(),
	points: String,
	profile_pic: String,
	//created_at: new Date(),
	//updated_at: Date
});
var TestSchema = mongoose.Schema({
	var1: String,
	var2: String
});
var GameTableSchema = mongoose.Schema({
	game_id: { type: String, required: true, unique: true },
	current_position: String,
	player1: String,
	player2: String,
	player1_channel: String,
	player2_channel: String,
	created_time: Date,
	start_time: Date,
	last_move: String,
	turn: String,
	time_limit: Date,
	game_status: Number,
	result: String,
	moves: String,
	move_num: Number
	
});

//var UserModel = mongoose.model('User',UserTableSchema)
//module.exports = mongoose.model('User',UserTableSchema)
module.exports = {
	User_Table_Model: mongoose.model('User',UserTableSchema),
	Game_Table_Model: mongoose.model('Game',GameTableSchema),
	Test_Model: mongoose.model('Test',TestSchema)
}



