var GameStates = function() {
	var count = 0;
	CurrentState = new State1(this);
  
  this.change = function(state){
  	if(count++> = 10) return;
	CurrentState = state;
    CurrentState.go();
  }
  this.start = function(){
  CurrentState.go();
  }
 	
}



var State1 = function (game){
		var i = 0;
		this.go = function(){
    		while(1){
        	i++;
          logging(i\n);
          if(i===11){
          	logging("Changing to state2\n");
    				game.change(new State2(game))
      			break;
    			}
    		}	
    }
    
}

var State2 = function (game){
		var j = 0;
		this.go = function(){
    		while(1){
        	j++;
          logging(j\n)
          if(j===11){
          	logging("Changing to state3\n");
    				game.change(new State3(game))
      			break;
    			}
    		}	
    }
    
}
var State3 = function (game){
		var k = 0;
		this.go = function(){
    		while(1){
        	k++;
          loggin(k\n);
          if(k===11){
          	logging("Changing to state1\n");
    				game.change(new State1(game))
      			break;
    			}
    		}	
    }
    
}

//var Chess = new GameStates();

//Chess.start();