module.exports.req_user1 = {
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
			game_id: ""
		}
		,connection:{
			listener:[]
			,addListener:function(a,b){
				this.listener[0] = a
				this.listener[1] = b
			}
		}
}
module.exports.req_user2 = {
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
			game_id: ""
		}
		,connection:{
			listener:[]
			,addListener: function(a,b){
				this.listener[0] = a
				this.listener[1] = b
			}
		}
}

module.exports.res_user1 = {
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
};

module.exports.res_user2 = {
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
};