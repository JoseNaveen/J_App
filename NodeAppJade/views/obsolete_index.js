exports.login = function(req, res){
	if(req.body.username === 'jose' && req.body.password ==='enter'){ 
		//auth the user with entered username password
		req.session.username = req.body.username; 
		//store the username with request session
		//console.log(req.session.username)
		res.render('index',{user: req.session.username}); 
		//render the home page
	}
	else{
		if (req.body.username === 'naveen' && req.body.password ==='enter'){ 
			//auth the user with entered username password
			req.session.username = req.body.username; 
			//same as above written twice since i dont have db so simulate 2 users
			res.render('index',{user: req.session.username}); 
			//render the home page
		}
		else{
			res.redirect('/');
		}
		
	}	
};

exports.index = function(req, res){
	var sess = req.session;
	if(!req.session.username){
		res.render('index1');
	}
	else{
		res.render('index',{user: req.session.username});
	}
};



exports.board = function(req, res){
	  res.render('board', { user: 'Jose1' });
	};
	
exports.state = function(req, res){
	  res.render('state', { user: 'Jose1' });
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
exports.create = function(req,res){
	if(req.session.username ==='jose' || req.session.username === 'naveen'){
		new_game = create_game(req.session.username);
		if(new_game.player1 === req.session.username)
			{
			console.log("first player joined");
			console.log("\nCreating new game\n");
			//new_game.player1 = req.session.username;
			//console.log(JSON.stringify(new_game))
			//save game in db
			res.json('{"platform":"web","version":"0.1","game_id":' + new_game.game_id + //
					',"my_color":"white","turn":1,"game_status":' + 
						new_game.game_status + '}');
			}
		else
			{
			new_game.player2 = req.session.username;
			console.log("second player joining")
			console.log("\nStarting game")
			new_game.start_time = new Date();
			new_game.game_status = "started";
			console.log("\nGame started");
			//console.log(pre_game_stream_session);
			if(pre_game_stream_session[new_game.player1]){
				pre_game_stream_session[new_game.player1].write("event: game_start\n" + 
	    				"data: start" + "\n\n")
	    	}
			res.json('{"platform":"web","version":"0.1","game_id":' + new_game.game_id + //
					',"my_color":"black","turn":0,"game_status":' + "\"" +
					new_game.game_status + "\"" + '}');
			}
		};
	//res.write("hello");
};