/**
 * http://usejsdoc.org/
 */
var currentBrd;
var fs = require('fs');
var db = require('./models/db')
var Game_Table = db.Game_Table_Model
var randomstring = require("randomstring");
//var Test_Model = db.Test_Model
//Class definition for the game object. This will be stored
//In the database on instantiation

function Game(player1)
{
	this.game_id = Math.floor((Math.random() * 10000 ) + 1);
	this.current_position = '[{"cell":{"clr":"wt","pos":26},"piece":{"type":{"value":5,"name":"brok"},"col":"black","name":"brook1"}},{"cell":{"clr":"bk","pos":27},"piece":{"type":{"value":3,"name":"bknght"},"col":"black","name":"bknght1"}},{"cell":{"clr":"wt","pos":28},"piece":{"type":{"value":4,"name":"bbshp"},"col":"black","name":"bbshp1"}},{"cell":{"clr":"bk","pos":29},"piece":{"type":{"value":8,"name":"bqueen"},"col":"black","name":"bqueen1"}},{"cell":{"clr":"wt","pos":30},"piece":{"type":{"value":15,"name":"bking"},"col":"black","name":"bking1"}},{"cell":{"clr":"bk","pos":31},"piece":{"type":{"value":4,"name":"bbshp"},"col":"black","name":"bbshp2"}},{"cell":{"clr":"wt","pos":32},"piece":{"type":{"value":3,"name":"bknght"},"col":"black","name":"bknght2"}},{"cell":{"clr":"bk","pos":33},"piece":{"type":{"value":5,"name":"brok"},"col":"black","name":"brook2"}},{"cell":{"clr":"bk","pos":38},"piece":{"type":{"value":1,"name":"bpawn"},"col":"black","name":"bpawn1"}},{"cell":{"clr":"wt","pos":39},"piece":{"type":{"value":1,"name":"bpawn"},"col":"black","name":"bpawn2"}},{"cell":{"clr":"bk","pos":40},"piece":{"type":{"value":1,"name":"bpawn"},"col":"black","name":"bpawn3"}},{"cell":{"clr":"wt","pos":41},"piece":{"type":{"value":1,"name":"bpawn"},"col":"black","name":"bpawn4"}},{"cell":{"clr":"bk","pos":42},"piece":{"type":{"value":1,"name":"bpawn"},"col":"black","name":"bpawn5"}},{"cell":{"clr":"wt","pos":43},"piece":{"type":{"value":1,"name":"bpawn"},"col":"black","name":"bpawn6"}},{"cell":{"clr":"bk","pos":44},"piece":{"type":{"value":1,"name":"bpawn"},"col":"black","name":"bpawn7"}},{"cell":{"clr":"wt","pos":45},"piece":{"type":{"value":1,"name":"bpawn"},"col":"black","name":"bpawn8"}},{"cell":{"clr":"wt","pos":98},"piece":{"type":{"value":1,"name":"wpawn"},"col":"white","name":"wpawn1"}},{"cell":{"clr":"bk","pos":99},"piece":{"type":{"value":1,"name":"wpawn"},"col":"white","name":"wpawn2"}},{"cell":{"clr":"wt","pos":100},"piece":{"type":{"value":1,"name":"wpawn"},"col":"white","name":"wpawn3"}},{"cell":{"clr":"bk","pos":101},"piece":{"type":{"value":1,"name":"wpawn"},"col":"white","name":"wpawn4"}},{"cell":{"clr":"wt","pos":102},"piece":{"type":{"value":1,"name":"wpawn"},"col":"white","name":"wpawn5"}},{"cell":{"clr":"bk","pos":103},"piece":{"type":{"value":1,"name":"wpawn"},"col":"white","name":"wpawn6"}},{"cell":{"clr":"wt","pos":104},"piece":{"type":{"value":1,"name":"wpawn"},"col":"white","name":"wpawn7"}},{"cell":{"clr":"bk","pos":105},"piece":{"type":{"value":1,"name":"wpawn"},"col":"white","name":"wpawn8"}},{"cell":{"clr":"bk","pos":110},"piece":{"type":{"value":5,"name":"wrook"},"col":"white","name":"wrook1"}},{"cell":{"clr":"wt","pos":111},"piece":{"type":{"value":3,"name":"wknght"},"col":"white","name":"wknght1"}},{"cell":{"clr":"bk","pos":112},"piece":{"type":{"value":4,"name":"wbshp"},"col":"white","name":"wbshp1"}},{"cell":{"clr":"wt","pos":113},"piece":{"type":{"value":8,"name":"wqueen"},"col":"white","name":"wqueen"}},{"cell":{"clr":"bk","pos":114},"piece":{"type":{"value":15,"name":"wking"},"col":"white","name":"wking"}},{"cell":{"clr":"wt","pos":115},"piece":{"type":{"value":4,"name":"wbshp"},"col":"white","name":"wbshp2"}},{"cell":{"clr":"bk","pos":116},"piece":{"type":{"value":3,"name":"wknght"},"col":"white","name":"wknght2"}},{"cell":{"clr":"wt","pos":117},"piece":{"type":{"value":5,"name":"wrook"},"col":"white","name":"wrook2"}}]';
	this.player1 = player1;
	this.player2 = undefined;
	this.player1_channel = undefined;
	this.player2_channel = undefined;
	this.created_time = new Date();
	this.start_time = undefined;
	this.last_move = undefined;
	this.turn = 1;
	this.time_limit = undefined;
	this.game_status = 0; //0,started,finished
	this.result = undefined; //white,black,draw
	this.moves = [];
	this.move_num = 0;		
}
var game_array = []; //array which stores all the created games
//game_array.prototype.moves = []
var i = 0;
function load_games_from_db(){
	Game_Table.find({},function(err,games){
		games.forEach(function(game){
			//console.log(game);
			game_array.push(game);
		});
	});
};
load_games_from_db();

var game;
var logging=0;
//Functions for retrieving,saving, and different actions on the game database
module.exports = {
		create_or_fetch_game_from_db: function(user,callback){
			Game_Table.find({game_status:0},function(err,games){
				if(err){
					console.log(err)
				}
				//console.log(games[0])
				if(games.length){
					if(games[0].player1 != user){
					console.log("using existing game")
					
					callback(games[0])
					return
					}
				}
				console.log("creating new")
				game = new Game(user)
				new_game = new Game_Table(game)
				new_game.save(function(err,new_game){
					callback(new_game)
					return
				})
				
				
			})
			
			
		},
		//this function will swift through all existing games and allocate a new if no valid game exists.
		//If a valid game is found then it is returned
		create_or_fetch_game: function(user){
			var i = 0;
			//console.log(Game_Table.find());
			while(game_array[i]){ //if game array is defined
				if(logging){
					console.log("\nChecking game: " + game_array[i].game_id +"\n")
				}
				//console.log("\nValid game: " + i +"\n")
				if(!game_array[i].game_status){
					if(game_array[i].player1 != user){
						//console.log("\nUsing Existing game\n")
						if(logging){
							console.log("\nUsing Valid game: " + game_array[i].game_id +"\n")
						}
						return game_array[i];
					}
					
					i++;
				}//return the oldest game with status as undefined
				else{
					if(logging){
						console.log("\nCannot use game: " + game_array[i].game_id +"\n")
					}
					i++;
				}
			}
			var new_game;
			new_game = new Game(user)
			game_array.push(new_game);

			//new_game = JSON.stringify(new_game)
			//console.log(new_game);
			game = new Game_Table(new_game)
			game.save(function(err,game){
				if(err){
					console.log("save game failed")
					return;
				}
				//console.log("save game Successful")
			});
			//console.log(game_array[game_array.length - 1]);
			return game_array[game_array.length - 1];
		},
		get_player_id: function(player,id){
			var player_id;
			Game_Table.find({game_id:id},function(err,game){
				if(err){
				console.log("\nUnable to fetch game to save the stream")
				}
				if(game[0]){
					if(game[0].player1 === player){
						player_id = 1
					}
					if(game[0].player2 === player)
					{
						player_id = 2
					}
				}
				
			});
			return player_id;
		},
		get_game_position_from_db: function(id,callback){
			Game_Table.find({game_id:id},function(err,game){
				callback(game[0])
				return
			})
			
		},
//		get_game_postion: function(id){
//			var i = 0;			
//			//console.log(id,game_array[0])
//			while(1){
//				console.log(i);
//				if(game_array[i].game_id === Number(id) || game_array[i].game_id === id){
//					return game_array[i];
//				};
//				i++;
//			}
//			return 0;
//		},
		get_game_status: function(id){
			var i = 0;
			while(1){
				if(game_array[i].game_id === Number(id)){
					return 1;
				}
				i++;				
			}
		},
		get_game: function(id,callback){
			var i = 0;
			var return_game;
			Game_Table.find({game_id:id},function(err,loaded_game){
				//console.log(loaded_game);
				if(err){
					console.log(err)
				}
				else{
					//console.log(loaded_game[0])
					callback(err,loaded_game[0])
					
					
				}
					
			});

		},
		get_game_from_db: function(id,callback){
			var return_game;
			Game_Table.find({game_id:id},function(err,game){
				//console.log(game[0])
				return_game = game[0];
				callback(return_game);
			})
			
		},
		save_game_from_object: function(current_game){
			Game_Table.update({game_id:current_game.game_id},current_game,function(err,update){
				if(err){
					console.log("Found this error while saving: " + err);
				}
				else{
					
					//console.log(current_game);
					//console.log("\nSuccessfully saved");
				}
				
			});
		},
		save_game: function(id,move_num,current_position,movedata,turn,game_status){
			//fetch the game using the id and set the following values
			var i = 0;
			game_array[0]
			console.log(id,move_num)
			
			while(game_array[i]){
				if(game_array[i].game_id === Number(id)|| game_array[i].game_id === id){
					console.log(game_array[i].current_postion)
					game_array[i].move_num = move_num;
					game_array[i].current_position = current_position;
					console.log(game_array[i].current_postion)
					game_array[i].moves.push(movedata);
					game_array[i].turn = turn;
					game_array[i].last_move = new Date();
					game_array[i].game_status = game_status;
					fs.writeFile("game_" + id + ".json",JSON.stringify(game_array[i]) + "\n\n")
					Game_Table.update({game_id:game_array[i].game_id},game_array[i],function(err,update){
						if(err){
							console.log(err)
						}
						else{
							console.log("\nMove Saved")
						}
					});
					return 1;
				}
				i++;
			}
		},
		//function to delete a game record from the db. Should be used only by test code
		delete_game: function(id){
			Game_Table.remove({game_id:id},function(err){
				if(err){
					console.log("Error deleting record")
				}
			})
		},
		get_created_game_list_from_db: function(user,callback){
			var game_list = []
			Game_Table.find({$or:[ {player1:user}, {player2:user} ]},function(err,data){
				if(err){
					console.log(err)
					return
				}
				data.forEach(function(current_game){
					game_list.push(current_game.game_id)
				})
				callback(game_list)
				
			})
		}
//		get_created_game_list: function(user){
//			var i = 0;
//			var game_list = []
//			//console.log(user)
//			while(game_array[i]){
//				//console.log(game_array[i]);
//				if(game_array[i].player1 === user || game_array[i].player2 ===user){
//					game_list.push(game_array[i].game_id)
//				}
//				i++;
//			}
//			return game_list;
//		}
};