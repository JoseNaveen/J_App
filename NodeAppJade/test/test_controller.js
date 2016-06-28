/**
 * http://usejsdoc.org/
 */
var expect = require("chai").expect;
var routes = require("../routes/index.js");
var controller = require("../controller.js");
var events = require('events');
var variables = require("./vars/test_variables.js")
var j=0;
var game_list=[]
for(i=0;i<10;i++){
	describe("controller.create",function(){
		beforeEach(function(done){
			routes.create_stub(variables.req_user1,variables.res_user1)
			this.timeout(10000)
			setTimeout(function(){
				game_list.push(JSON.parse(variables.res_user1.jsonData).game_id)
				routes.create_stub(variables.req_user2,variables.res_user2)
				setTimeout(function(){
					routes.create_stub(variables.req_user2,variables.res_user2)
					done()
				},1900)
			},1900)
		})
		afterEach(function(done){
			setTimeout(function(){
				console.log(game_list)
				done()
			},1900)
		})
		it("pass",function(){
			
		})
	})
}

describe("controller.get_game_list_from_db",function(){
	var list = []
	var callback = function(tmp){
		list = tmp
		return
	}
	beforeEach(function(done){
		controller.get_created_game_list_from_db("jose",callback)
		setTimeout(function(){
			console.log(list)
			done();
		},1900)
	})
	it("validate",function(){
		
	})
})