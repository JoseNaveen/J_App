var fs = require('fs');
var res_array = [];
var other_session = [];
var pre_game_stream_session = [];
var game_stream = [];
var controller = require('../controller');

var mongoose = require('mongoose');

var db = require('../models/db');

var UserModel = db.User_Table_Model;
save_gam = controller.save_game_from_object;

//Route for home page. Serve default page for unknown user
//Serve Logged in page for known user
exports.home = function(req,res){
	if(!req.session.username){
		res.render('home',{status: 'NotLoggedIn' });
	}
	else{
		res.render('home',{status: 'LoggedIn' });
	}

};
exports.test = function(req,res){
	res.render('main.ejs');
}
exports.play = function(req,res){
	if(req.session.username){
		res.render('game_page.ejs')
	}
	else{
		res.render('home',{status: 'NotLoggedIn'});
	}
	
};
//Route of signup action
//Store entry in db and return success to browser as json
exports.signup = function(req,res){
	var user = new UserModel({username:req.body.username,email_id:req.body.email,password:req.body.password,points:0,profile_pic:'none'});
	user.save(function(err,user){
		if(err){
			res.send("failed");
			return;
		}
		console.log("SignUp Successful");
	});
	res.json('{"result":"success"}');
};

//Signin handler authenticates by checking the db for right password
//returns appropriate error message to the browser
exports.signin = function(req,res){
	
	UserModel.find({username:req.body.username},function(err,user){
		if(err){
			console.log(err);
			res.json('{"result":"failure","message":"error on user db query"}');
			return;
		}
		//console.log(err,user);
		if(user[0]){
		if(user[0].password === req.body.password){
			req.session.username = req.body.username;
			res.json('{"result":"success"}');
			//console.log("success")
			return
		}
		
		else{
			res.json('{"result":"failure","message":"incorrect password"}');
			return
		}
		}
		res.json('{"result":"failure","message":"incorrect username"}');
	});	
};

//logout handler - destroys the session on logout
exports.logout = function(req, res){
	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/home');
		}
	});
};

var val;
get_position= controller.get_game_postion;
exports.piece = function(req, res){
	get_game(req.query.game_id,function(err,loaded_game){
	if(loaded_game.current_position){
		//console.log(loaded_game.current_position);
		res.json(loaded_game.current_position);
	}
	});
};
save_game = controller.save_game;
get_game = controller.get_game;
exports.game = function(req, res){
	var tmp = []
	var tmp_obj = {}
	get_game(req.query.game_id,function(err,game){
	if(game){
		player1 = game.player1;
		player2 = game.player2;
	}
	if(req.session.username === player1){
		if(other_session[player2]){
			if(game.turn === "1" || game.turn === 1){
				other_session[player2].write("data: " +  req.body.moveData + "\n\n");
				tmp_obj = req.body.moveData
				//tmp.push(game.moves)
				//tmp.push(tmp_obj)
				tmp[req.body.move] = tmp_obj
				game.moves = games.moves + JSON.stringify(tmp)
				game.move_num = req.body.move;
				game.current_position = req.body.currentBoard;
				//console.log(game.current_position)
				game.game_status = 99;
				game.turn = "2"
				game.result= "TESTING"
				save_gam(game);
			}
		}
		else{
			if(game.turn === "1"|| game.turn === 1){
			console.log("\nStream not found");
			tmp_obj = req.body.moveData
			//tmp.push(game.moves)
			//tmp.push(tmp_obj)
			tmp[req.body.move] = tmp_obj
			game.moves = games.moves + JSON.stringify(tmp)
			game.move_num = req.body.move;
			game.current_position = req.body.currentBoard;
			//console.log(game.current_position)
			game.game_status = 99;
			game.turn = "2"
			game.result= "TESTING"
			save_gam(game);
			}
			
		}
		if(1){res.send("valid")}
		else{res.send("invalid")}		
	}
	else{ //find some way to identify the other session
		if(req.session.username ===player2){
			if(game.turn==="2"|| game.turn === 2){
			if(other_session[player1]){
				tmp_obj = req.body.moveData
				//tmp.push(game.moves)
				//tmp.push(tmp_obj)
				tmp[req.body.move] = tmp_obj
				game.moves = JSON.stringify(tmp)
				game.move_num = req.body.move;
				game.current_position = req.body.currentBoard;
				game.game_status = 99;
				//console.log(game.current_position)
				game.turn = "1"
				game.result= "TESTING"
				save_gam(game);
				//save_game(req.body.gameid,req.body.move,req.body.currentBoard,//
						//req.body.moveData,1,req.body.game_status);
			}
			}
			else{
				if(game.turn==="2" || game.turn === 2){
				console.log("\nStream not found");
				//console.log(req.body.currentBoard);
				tmp_obj = req.body.moveData
				//tmp.push(game.moves)
				//tmp.push(tmp_obj)
				tmp[req.body.move] = tmp_obj
				game.moves = JSON.stringify(tmp)
				game.move_num = req.body.move;
				game.current_position = req.body.currentBoard;;
				game.game_status = 99;
				//console.log(game.current_position)
				game.turn = "1"
				game.result= "TESTING"
				//game.save();
				save_gam(game);
				//save_game(req.body.gameid,req.body.move,req.body.currentBoard,//
						//req.body.moveData,1,req.body.game_status);
			}
			}
			if(1){res.send("valid")}
			else{res.send("invalid")}		
		}
	}
	});
};


exports.frame_test = function(req,res){
	if(!req.session.username){
		res.render('frame_test');
	}
	else{
		res.render('board',{user: req.session.username});
	}
};




exports.game_stream = function(req,res){ //server sent streams to communicate between two users
	//console.log(req.query.game_id);
	if(req.session){
		res.writeHead(200, {"Content-Type":"text/event-stream", "Cache-Control":"no-cache", //
			"Connection":"keep-alive"});
	}
	res.write("retry: 10000\n");
	res.write("event: newmove\n" +
			"data: {\"move_data\": \"hello\"}" + "\n\n");
	other_session[req.session.username] = res;
	//res_array[req.session.username].write("data: " + (new Date()) + "\n\n");
	req.connection.addListener("close", function () {
		console.log("\n" + req.session.username + "closing connection\n")
		other_session[req.session.username] = undefined;
		//clearInterval(interval);
	}, false);
};
create_game = controller.create_or_fetch_game;
var new_game;
exports.create_stub = function(req,res){
	var tmp_game
	var callback = function(game){
		if(game.player1 === req.session.username){
			if(Number(game.turn) === 1){
				turn = 1
			}
			else{
				turn = 0
			}
			res.json('{"platform":"web","version":"0.1","game_id":' + game.game_id + //
					',"my_color":"white","turn":' + turn + ',"game_status":' + 
					game.game_status + '}');
		}
		else
		{
			game.player2 = req.session.username;
			//console.log("second player joining")
			//console.log("\nStarting game")
			game.start_time = new Date();
			game.game_status = 1;
			save_gam(game);
			//console.log("\nGame started");
			//console.log(pre_game_stream_session);
			if(Number(game.turn) === 1){
				turn = 0
			}
			else{
				turn = 1
			}
			if(pre_game_stream_session[game.player1]){
				pre_game_stream_session[game.player1].write("event: game_start\n" + 
						"data: start" + "\n\n")
			}
			res.json('{"platform":"web","version":"0.1","game_id":' + game.game_id + //
					',"my_color":"black","turn":' + turn + ',"game_status":' + "\"" +
					game.game_status + "\"" + '}');
		}
	};
	controller.create_or_fetch_game_from_db(req.session.username,callback)
}
exports.create = function(req,res){
	var turn;
	if(req.session.username){
		//console.log("Creating new game for " + req.session.username);
		new_game = create_game(req.session.username);
		if(new_game.player1 === req.session.username)
		{
			//console.log("first player joined");
			//console.log("\nCreating new game\n");
			//console.log(JSON.stringify(new_game))
			//save game in db
			if(Number(new_game.turn) === 1){
				turn = 1
			}
			else{
				turn = 0
			}
			res.json('{"platform":"web","version":"0.1","game_id":' + new_game.game_id + //
					',"my_color":"white","turn":' + turn + ',"game_status":' + 
					new_game.game_status + '}');
		}
		else
		{
			new_game.player2 = req.session.username;
			//console.log("second player joining")
			//console.log("\nStarting game")
			new_game.start_time = new Date();
			new_game.game_status = 1;
			save_gam(new_game);
			//console.log("\nGame started");
			//console.log(pre_game_stream_session);
			if(Number(new_game.turn) === 1){
				turn = 0
			}
			else{
				turn = 1
			}
			if(pre_game_stream_session[new_game.player1]){
				pre_game_stream_session[new_game.player1].write("event: game_start\n" + 
						"data: start" + "\n\n")
			}
			res.json('{"platform":"web","version":"0.1","game_id":' + new_game.game_id + //
					',"my_color":"black","turn":' + turn + ',"game_status":' + "\"" +
					new_game.game_status + "\"" + '}');
		}
	};
	//res.write("hello");
};

delete_game_from_db = controller.delete_game;
//delete game module for test code
exports.delete_game = function(game_id){
	delete_game_from_db(game_id)
}

exports.move_stream = function(req,res){
	if(req.body.data === '12345'){
		res.json('')
	}
};
get_status = controller.get_game_status;
save_game_stream = controller.save_game_stream;
get_player_id = controller.get_player_id;
exports.pre_stream = function(req,res){
	if(req.session){
		res.writeHead(200, {"Content-Type":"text/event-stream", "Cache-Control":"no-cache", //
			"Connection":"keep-alive"});
		res.write("retry: 10000\n");
		res.write("data: test data\n\n");
		pre_game_stream_session[req.session.username] = res;
		//save_game_stream(req.query.game_id,req.session.username,res);
		game_stream[req.query.game_id] = {}
		var usr = req.session.username
		player_id = get_player_id(req.session.username,req.query.game_id)
		if(player_id === 1){
			game_stream[req.query.game_id].player1 = res;
		}
		if(player_id == 2){
			game_stream[req.query.game_id].player2 = res;
		}
		req.connection.addListener("close", function () {
			console.log("\n" + req.session.username + "closing connection\n")
			pre_game_stream_session[req.session.username] = null;
		});
	}
}

get_game_list = controller.get_created_game_list;
get_game_list_from_db = controller.get_created_game_list_from_db;
exports.get_game_list = function(req,res){
	var game_list = [];
	var callback = function(tmp){
		game_list = tmp
		res.json(game_list)
	}
	get_game_list_from_db(req.session.username,callback)
}
//exports.get_game_list = function(req,res){
//	var game_list = [];
//	game_list = get_game_list(req.session.username)
//	//console.log(game_list)
//	//console.log(JSON.stringify(game_list))
//	res.json(game_list);
//}
//Function to load selected ongoing game

exports.load_game = function(req,res){
	var turn;
	get_game(req.query.game_id,function(err,created_game){
		if(created_game.player1 === req.session.username){
			if(Number(created_game.turn) === 1){
				turn = 1
			}
			else{
				turn = 0
			}
			res.json('{"platform":"web","version":"0.1","game_id":' + created_game.game_id + //
					',"my_color":"white","turn":' + turn + ',"game_status":' + "\"" +
					created_game.game_status + "\""+ '}');
		}
		if(created_game.player2 === req.session.username){
			if(Number(created_game.turn) === 1){
				turn = 0
			}
			else{
				turn = 1
			}
			if(pre_game_stream_session[created_game.player1]){
				pre_game_stream_session[created_game.player1].write("event: game_start\n" + 
						"data: start" + "\n\n")
			}
			res.json('{"platform":"web","version":"0.1","game_id":' + created_game.game_id + //
					',"my_color":"black","turn":' + turn + ',"game_status":' + "\"" +
					created_game.game_status + "\"" + '}');
			
		}
	});
	
}