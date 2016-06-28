//Filename: test_index.js
//Unit test code for index.js and few related functions
//from controller.js
//Author: Jose
var expect = require("chai").expect;
var routes = require("../routes/index.js");
var controller = require("../controller.js");
var logging=0;
var test_games=[];
var req = {
		session:{
			username:1
		}
		,body:{
			username:"jose"
			,password:"enter"
		}
};
var req_user1 = {
	session:{
		username:"jose"
	}
	,body:{
		username:"jose"
		,password:"enter"
	}
};
var req_user2 = {
	session:{
		username:"naveen"
	}
	,body:{
		username:"naveen"
		,password:"enter"
	}
};
var req_incorrect_user = {
		session:{
			username:1
		}
		,body:{
			username:"josey"
			,password:"enter"
		}
};
var req_incorrect_passwd = {
		session:{
			username:1
		}
		,body:{
			username:"jose"
			,password:"enteer"
		}
};
var req_unknown_user = {
		session:{
			username:0
		}
};
var res = {
		viewName:""
		, data:{}
		,sendData:{}
		,jsonData:{}
		,writeData:{}
		,writeHeadData:{}
		, render: function(view,viewData){
			this.viewName=view;
			this.data=viewData;
		}
		,json: function(d){
			this.jsonData = d;
		}
		,send: function(d){
			this.sendData = d;
		}
		,write: function(d){
			this.writeData = d;
		}
		,writeHead: function(d){
			this.writeHeadData = d;
		}
};
var res_user1 = {
		viewName:""
			, data:{}
			,sendData:{}
			,jsonData:{}
			,writeData:{}
			,writeHeadData:[]
	, render: function(view,viewData){
		this.viewName=view
		this.data=viewData
	}
	,json: function(d){
		this.jsonData = d
	}
	,send: function(d){
		this.sendData = d
	}
	,write: function(d){
		this.writeData = d
	}
	,writeHead: function(d,c){
		this.writeHeadData[0] = d
		this.writeHeadData[1] = c
	}
}
var res_user2 = {
	viewName:""
	,data:{}
	,sendData:{}
	,jsonData:{}
	,writeData:{}
	,writeHeadData:[]
	, render: function(view,viewData){
		this.viewName=view
		this.data=viewData
	}
	,json: function(d){
		this.jsonData = d
	}
	,send: function(d){
		this.sendData = d
	}
	,write: function(d){
		this.writeData = d
	}
	,writeHead: function(d,c){
		this.writeHeadData[0] = d
		this.writeHeadData[1] = c
	}
}
var res_user1_game = {
		viewName:""
			, data:{}
			,sendData:{}
			,jsonData:{}
			,writeData:{}
			,writeHeadData:[]
	, render: function(view,viewData){
		this.viewName=view
		this.data=viewData
	}
	,json: function(d){
		this.jsonData = d
	}
	,send: function(d){
		this.sendData = d
	}
	,write: function(d){
		this.writeData = d
	}
	,writeHead: function(d,c){
		this.writeHeadData[0] = d
		this.writeHeadData[1] = c
	}
}
var res_user2_game = {
	viewName:""
	,data:{}
	,sendData:{}
	,jsonData:{}
	,writeData:{}
	,writeHeadData:[]
	, render: function(view,viewData){
		this.viewName=view
		this.data=viewData
	}
	,json: function(d){
		this.jsonData = d
	}
	,send: function(d){
		this.sendData = d
	}
	,write: function(d){
		this.writeData = d
	}
	,writeHead: function(d,c){
		this.writeHeadData[0] = d
		this.writeHeadData[1] = c
	}
}
describe("routes.index",function(){
	describe(".home()",function(){
		it("render correct web page for known and unknown user",function(){
			routes.home(req,res)
			expect(res).to.have.a.property("viewName","home")
			expect(res.data).to.have.a.property("status", "LoggedIn")
			routes.home(req_unknown_user,res)
			expect(res).to.have.a.property("viewName","home")
			expect(res.data).to.have.a.property("status", "NotLoggedIn")
		})
	})
})


describe("routes.index",function(){
	describe(".play()",function(){
		it("render the appropriate page for game for logged_in/unknown user",function(){
			routes.play(req,res)
			expect(res).to.have.a.property("viewName","game_page.ejs")
			routes.play(req_unknown_user,res)
			expect(res).to.have.a.property("viewName","home")
			expect(res.data).to.have.a.property("status", "NotLoggedIn")
			
		})
	})
})

describe("routes.index",function(){
	describe(".signin()",function(){
		beforeEach(function(done){
			routes.signin(req,res)
		    setTimeout(function(){
		      done()
		    }, 1900);

		  });
		afterEach(function(done){
			//console.log(res.jsonData)
			done()
		})
		it("check the signin router success case",function(){
			expect(res.jsonData).equals('{"result":"success"}')
		})
	})
})

describe("routes.index",function(){
	describe(".signin()",function(){
		beforeEach(function(done){
			req.session.passsword = "enter1"
			routes.signin(req_incorrect_passwd,res)
		    setTimeout(function(){
		      done()
		    }, 1900);

		  });
		afterEach(function(done){
			//console.log(res.jsonData)
			done()
		})
		it("check the signin router incorrect password",function(){
			expect(res.jsonData).equals('{"result":"failure","message":"incorrect password"}')
		})
	})
})


describe("routes.index",function(){
	describe(".signin()",function(){
		beforeEach(function(done){
			
			routes.signin(req_incorrect_user,res)
		    setTimeout(function(){
		      done()
		    }, 1900);

		  });
		afterEach(function(done){
			//res.viewName= ""
			//res.data={}
			//res.jsonData={}
			done()
		})
		it("check the signin router incorrect username",function(){
			expect(res.jsonData).equals('{"result":"failure","message":"incorrect username"}')
		})
	})
})
//describe("controller",function(){
//	describe(".get_game()",function(){
//		
//	})
//})

describe("routes.index",function(){
	var data_user1,data_user2;
	describe(".create()",function(){
		var data;
		this.timeout(10000);
		beforeEach(function(done){
			routes.create(req_user1,res_user1)
			setTimeout(function(){
				data_user1=JSON.parse(res_user1.jsonData)
				routes.create(req_user2,res_user2)
			      setTimeout(function(){
			    	  data_user2=JSON.parse(res_user2.jsonData)
			    	  done()
			      },500);
			    },500);
			
		})
		afterEach(function(done){
			test_games.push(data_user1["game_id"])
			if(logging){
				console.log(data_user1["game_id"],data_user2["game_id"])
			}
			if(data_user1["my_color"]==="white"){
				//routes.delete_game(data_user1["game_id"])
			}
			done()
		})
		it("check for create new game module",function(){
			
			expect(data_user1["platform"]).equals("web")
			expect(data_user1["version"]).equals("0.1")
			expect(data_user2["platform"]).equals("web")
			expect(data_user2["game_status"]).equals("1")
			expect(data_user2["my_color"]).equals("black")
			expect(data_user1["game_status"]).equals(0)
			expect(data_user1["my_color"]).equals("white")
			expect(data_user1["game_id"]).equals(data_user2["game_id"])
		})
	})
})



describe("routes.index",function(){
	var data_user1,data_user2;
	describe(".create()",function(){
		var data;
		this.timeout(10000);
		beforeEach(function(done){
			routes.create(req_user1,res_user1)
			setTimeout(function(){
				data_user1=JSON.parse(res_user1.jsonData)
				routes.create(req_user2,res_user2)
			      setTimeout(function(){
			    	  data_user2=JSON.parse(res_user2.jsonData)
			    	  done()
			      },500);
			    },500);
			
		})
		afterEach(function(done){
			if(logging){
				console.log(data_user1["game_id"],data_user2["game_id"])
				console.log(test_games)
			}
			test_games.push(data_user1["game_id"])
			
			if(data_user1["my_color"]==="white"){
				//routes.delete_game(data_user1["game_id"])
			}
			done()
		})
		it("check for create new game module existing game",function(){
			
			expect(data_user1["platform"]).equals("web")
			expect(data_user1["version"]).equals("0.1")
			expect(data_user2["version"]).equals("0.1")
			expect(data_user2["platform"]).equals("web")
			expect(data_user2["game_status"]).equals("1")
			expect(data_user2["my_color"]).equals("black")
			expect(data_user1["game_status"]).equals(0)
			expect(data_user1["my_color"]).equals("white")
			expect(data_user1["game_id"]).equals(data_user2["game_id"])
		})
	})
})

var req_user1 = {
	session:{
		username:"jose"
	}
	,body:{
		username:"jose"
		,password:"enter"
		,moveData:"movedata"
		,move:"somethingDummy"
		,currentBoard:"againDummy"
	},
	query:{
		game_id: test_games[0]
	}
	,connection:{
		listener:[]
		,addListener:function(a,b){
			this.listener[0] = a
			this.listener[1] = b
		}
	}
}
var req_user2 = {
	session:{
		username:"naveen"
	}
	,body:{
		username:"naveen"
		,password:"enter"
		,moveData:"movedata"
		,move:"somethingDummy"
		,currentBoard:"againDummy"
	},
	query:{
		game_id: test_games[0]
	}
	,connection:{
		listener:[]
		,addListener: function(a,b){
			this.listener[0] = a
			this.listener[1] = b
		}
	}
}
var req_user1_game = {
	session:{
		username:"jose"
	}
	,body:{
		username:"jose"
		,password:"enter"
		,moveData:{ "user1":"Hello", "url1":"#hello" }
		,move:0
		,currentBoard:"againDummy"
	},
	query:{
		game_id: test_games[0]
	}
	,connection:{
		listener:[]
		,addListener:function(a,b){
			this.listener[0] = a
			this.listener[1] = b
		}
	}
}
var req_user2_game = {
	session:{
		username:"naveen"
	}
	,body:{
		username:"naveen"
		,password:"enter"
		,moveData:{ "user2":"Hello", "url2":"#hello" }
		,move:1
		,currentBoard:"againDummy"
	},
	query:{
		game_id: test_games[0]
	}
	,connection:{
		listener:[]
		,addListener: function(a,b){
			this.listener[0] = a
			this.listener[1] = b
		}
	}
}

describe("routes.index.pre_stream",function(){
	beforeEach(function(done){
		req_user1.query.game_id = test_games[0]
		req_user2.query.game_id = test_games[0]
		routes.pre_stream(req_user1,res_user1)
		routes.pre_stream(req_user2,res_user2)
		routes.game_stream(req_user1_game,res_user1_game)
		routes.game_stream(req_user2_game,res_user2_game)
		setTimeout(function(){
			done()
		},1900)
		
	})
	afterEach(function(done){
		done()
	})
	it("checks the pre game stream router",function(){
		expect(res_user2.writeHeadData[0]).equals(200)
		expect(res_user1.writeHeadData[0]).equals(200)
		expect(req_user1.connection.listener[0]).equals("close")
		expect(req_user2.connection.listener[0]).equals("close")
		
		
	})
})

//describe("routes.index.game",function(){
//	var tmp_game = undefined
//	var callback = function(tmp){
//		tmp_game = tmp
//		console.log(JSON.parse(tmp_game.moves))
//	};
//		beforeEach(function(done){
//			this.timeout(10000)
//			req_user2_game.query.game_id = test_games[0]
//			req_user1_game.query.game_id = test_games[0]
//			routes.game(req_user1_game,res)
//			
//			setTimeout(function(){
//				controller.get_game_from_db(test_games[0],callback)
//				setTimeout(function(){
//					if(tmp_game.turn==="2"){
//						routes.game(req_user2_game,res)
//						
//						done()
//					}
//					else{
//						console.log("error in getting game from db")
//					}
//				},1900)
//				
//			},1900)
//		})
//		afterEach(function(done){
//			//routes.delete_game(test_games[0])
//			routes.delete_game(test_games[1])
//			done()
//		})
//	
//		it("check game streaming functionality",function(){
//			//expect(console.log(tmp_game)).to.be.true;
//			expect(tmp_game.player1).equals('jose');
//			expect(tmp_game.player2).equals('naveen');
//			//expect(JSON.parse(tmp_game.moves)).to.be.true;
//			
//		})
//	
//})


var i;


var j = 0
for (i=0;i<2;i++){
	req_user1_game.body.move = j
	req_user2_game.body.move = j + 1
	j = j + 1;
	describe("routes.index.game",function(){
		
		var tmp_game = undefined;
		var callback = function(data){
			tmp_game = data
			
		};
		var test_asserts = function(tmp){
			game = JSON.stringify(tmp);
			
			return true;
		}
		beforeEach(function(done){
			req_user1_game.query.game_id = test_games[0]
			req_user2_game.query.game_id = test_games[0]
			this.timeout(10000)
			
			routes.game(req_user1_game,res)
			setTimeout(function(){
				
				routes.game(req_user2_game,res)
				setTimeout(function(){
					controller.get_game_from_db(test_games[0],callback)
					done()
				},1900)
			},1900)
			
		})
		afterEach(function(done){
			//routes.delete_game(test_games[0])
			//routes.delete_game(test_games[1])
			done()
		})
		it("checking continous game play",function(){
			//expect(test_asserts(tmp_game)).to.be.true;
		});
	});
}



describe("controller.create_or_fetch_game_from_db",function(){
	var tmp_game
	var callback = function(tmp){
		tmp_game = tmp
		console.log(tmp)
	};
	beforeEach(function(done){
		controller.create_or_fetch_game_from_db("jose",callback)
		setTimeout(function(){
			//console.log(tmp_game)
			done()
		},1900)
		
	})
	it("create fetch game directly from db without storing in array",function(){
		
	});
})



