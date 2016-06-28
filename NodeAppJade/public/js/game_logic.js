function game_logic(Board,Game_Board){
p = Game_Board.p;
c = Board.c;
epiece = Board.epiece;
game_id = Board.game_id;
turn = Board.turn;
var k;
var game_object = new Object();
var white_king_pos = 114,black_king_pos = 30;
var pos = [];
var j;
var white_on_check = 0,black_on_check = 0;
game_object.wkp = white_king_pos;
game_object.bkp = black_king_pos;
game_object.woc = white_on_check;
game_object.boc = black_on_check;
function is_check(tgt){
	//console.log(tgt);
	white_on_check = 0;
	black_on_check = 0;
	for (t = 26; t < 118; t = t + 12) {
		for (i = 0; i < 8; i++) {
			if((p[t+i].piece.type.value != 15 ) && p[t+i].piece.type.value){
			//console.log("hello there");
			k=t + i;
			valid_squares(k);
			//console.log(t+i);
			//if(k===74){
			//console.log(pos,black_king_pos)
			//}
				for (j=0;j<pos.length;j++){
					
					if(white_king_pos === pos[j]){
						white_on_check = 1;
						return 1;
					}
					if(black_king_pos === pos[j]){
						//console.log(black_king_pos);
						//console.log(t+i,pos[j],black_king_pos);
						//console.log("black_on_check");
						black_on_check = 1;
						return 1;
					}
				}
			}			
		}
	}
	return 0;
}
function is_checkmate(){
	valid_squares(white_king_pos)
	if (pos.length)
	{
	return 1
	}
	valid_squares(black_king_pos)
	{
	return 1
	}	
}


displayImage = Game_Board.displayImage;

var col, row;
var move_data_json,
	move_data_object = [];
var notation = ["a", "b", "c", "d", "e", "f", "g", "h"];

function logging(text) {
    $('#logtext').append(text);

}

function valid_squares(src) {
    pos = [];
    //("valid_squares func started");
    //alert(src);
    var s = Number(src);
    var temp;
	//console.log(s);
	if(p[src].piece.type.value === 0){
		return 0;
	}
    if (p[src].piece.type.value === 15) { //king
    if (valid[s + 12]){
	if(((p[s + 12].piece.type.value) === 0) || (p[src].piece.col!=p[s + 12].piece.col)){
    pos.push(s + 12)
	//console.log(pos);
	}
	}
    
    if (valid[s + 12 + 1]){
	if(((p[s + 12 + 1].piece.type.value) === 0) || (p[src].piece.col!=p[s + 12+1].piece.col)){
    pos.push(s + 12+1)
	//console.log(pos);
	}
	}
    if (valid[s + 12 - 1]){
	if(((p[s + 12-1].piece.type.value) === 0) || (p[src].piece.col!=p[s + 12-1].piece.col)){
    pos.push(s + 12-1)
	//console.log(pos);
	}
	}
    if (valid[s + 1]){
	if(((p[s + 1].piece.type.value) === 0) || (p[src].piece.col!=p[s + 1].piece.col)){
    pos.push(s + 1)
	//console.log(pos);
	}
	}
    if (valid[s - 1]){
	if(((p[s -1].piece.type.value) === 0) || (p[src].piece.col!=p[s -1].piece.col)){
    pos.push(s - 1)
	//console.log(pos);
	}
	}
    if (valid[s - 12]){
	if(((p[s - 12].piece.type.value) === 0) || (p[src].piece.col!=p[s - 12].piece.col)){
    pos.push(s - 12)
	//console.log(pos);
	}
	}
    if (valid[s - 12 - 1]){
	if(((p[s -1- 12].piece.type.value) === 0) || (p[src].piece.col!=p[s - 1- 12].piece.col)){
    pos.push(s -1- 12)
	//console.log(pos);
	}
	}
    if (valid[s - 12 + 1]){
	if(((p[s +1- 12].piece.type.value) === 0) || (p[src].piece.col!=p[s +1- 12].piece.col)){
    pos.push(s +1- 12)
	//console.log(pos);
	}
	}
	//console.log(pos.length);
	//console.log(pos);
    return 1;
    }
    if (p[src].piece.type.value === 3) { // for Knight
    if (valid[s + 24 + 1]) {
	if(((p[s + 24 + 1].piece.type.value) === 0) || (p[src].piece.col!=p[s+24+1].piece.col)){
    pos.push(s + 24 + 1)
	//console.log(pos);
	
    }
	}
    
    if (valid[s + 24 - 1]){
	if(((p[s + 24 - 1].piece.type.value) === 0) || (p[src].piece.col != p[s + 24 - 1].piece.col)){
    pos.push(s + 24 - 1)
	//console.log(pos);
    }
	}
	
    if (valid[s - 24 - 1]){
	if(((p[s - 24 - 1].piece.type.value) === 0) || (p[src].piece.col!=p[s-24-1].piece.col)){
    pos.push(s - 24 - 1)
	//console.log(pos);
    }
	}
    if (valid[s - 24 + 1]){
	if(((p[s - 24 + 1].piece.type.value) === 0) || (p[src].piece.col!=p[s-24+1].piece.col)){
    pos.push(s - 24 + 1)
	//console.log(pos);
    }
	}
	
    if (valid[s + 12 + 2]){
	if(((p[s + 12 + 2].piece.type.value) === 0) || (p[src].piece.col!=p[s+12+2].piece.col)){
    pos.push(s + 12 + 2)
	//console.log(pos);
    }
	}
	
	
    if (valid[s + 12- 2]){
	if(((p[s + 12 - 2].piece.type.value) === 0) || (p[src].piece.col!=p[s+12-2].piece.col)){
    pos.push(s + 12 - 2)
	//console.log(pos);
    }
	}
	
	
    if (valid[s - 12 - 2]){
	if(((p[s -12-2].piece.type.value) === 0) || (p[src].piece.col!=p[s-12-2].piece.col)){
    pos.push(s -12-2)
	//console.log(pos);
    }
	}
	
    if (valid[s - 12 + 2]){
	if(((p[s -12+2].piece.type.value) === 0) || (p[src].piece.col!=p[s-12+2].piece.col)){
    pos.push(s -12+2)
	//console.log(pos);
    }
	}
	//console.log(pos.length);
	//console.log(pos)
	
    return 1;
    }
    if (p[src].piece.type.value === 4) {// for Bishop
    	temp =  s - 12 + 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				////logging(temp);
				pos.push(temp);
                temp = temp - 12 + 1;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						//logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp =  s - 12 - 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				////logging(temp);
				pos.push(temp);
                temp = temp - 12 - 1;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						//logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp =  s + 12 + 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				////logging(temp);
				pos.push(temp);
                temp = temp + 12 + 1;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						//logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp =  s + 12 - 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				////logging(temp);
				pos.push(temp);
                temp = temp + 12 - 1;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						//logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
		//console.log(pos.length);
		//console.log(pos);
      return 1;
    }
    if (p[src].piece.type.value === 8) { // for queen
    temp = s + 12;
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				////logging(temp);
				pos.push(temp);
                temp = temp + 12;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						////logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp = s + 1;
        

        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				//logging(temp);
				pos.push(temp);
                temp = temp + 1;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						//logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }

        temp = s - 1;
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				//logging(temp);
				pos.push(temp);
                temp = temp - 1;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						//logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp = s - 12;
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				//logging(temp);
				pos.push(temp);
                temp = temp - 12;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						//logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        //alert(pos.length);
        temp =  s - 12 + 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				//logging(temp);
				pos.push(temp);
                temp = temp - 12 + 1;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						//logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp =  s - 12 - 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				//logging(temp);
				pos.push(temp);
                temp = temp - 12 - 1;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						//logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp =  s + 12 + 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				//logging(temp);
				pos.push(temp);
                temp = temp + 12 + 1;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						//logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp =  s + 12 - 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				//logging(temp);
				pos.push(temp);
                temp = temp + 12 - 1;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						//logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
		//console.log(pos.length);
		//console.log(s,pos);
        
        return 1;
    }
    if (p[src].piece.type.value === 1 && (p[src].piece.col ==='black') ) { //bpawn
    		if ($('#chessboard #' + src).parent().hasClass('rank-2')&&((p[s + 24].piece.type.value) === 0)) {
            //alert(s+24);
            pos.push(s + 24);
        }
        if (valid[s + 12] === 1 &&((p[s + 12].piece.type.value) === 0)) 				{
            pos.push(s + 12);
        }
        if (valid[s + 12 + 1] === 1) {
            if (p[s + 12 + 1].piece.col === 'white') {
                pos.push(s + 12 + 1);
            }
        }
        if (valid[s + 12 - 1] === 1) {
            if (p[s + 12 - 1].piece.col === 'white') {
                pos.push(s + 12 - 1);
            }
        }
		//console.log(pos.length);
		//console.log(pos);
        return 1;
    }    
    if (p[src].piece.type.value === 1) { //for wpawn
        //alert("you clicked on a pawn");
        if ($('#chessboard #' + src).parent().hasClass('rank-7')&&((p[s - 24].piece.type.value) === 0)) {
            //alert(s+24);
            pos.push(s - 24);
        }
        if (valid[s - 12] === 1 &&((p[s - 12].piece.type.value) === 0)) {
            pos.push(s - 12);
        }
        if (valid[s - 12 + 1] === 1) {
            if (p[s - 12 + 1].piece.col === 'black') {
                pos.push(s - 12 + 1);
            }
        }
        if (valid[s - 12 - 1] === 1) {
            if (p[s - 12 - 1].piece.col === 'black') {
                pos.push(s - 12 - 1);
            }
        }
		//console.log(pos.length);
		//console.log(pos);
        return 1;
    }
    if (p[src].piece.type.value === 5) { //for rook
        ////logging("you clicked on rook\n")
        temp = s + 12;
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				////logging(temp);
				pos.push(temp);
                temp = temp + 12;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						////logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp = s + 1;

        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				//logging(temp);
				pos.push(temp);
                temp = temp + 1;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						//logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }

        temp = s - 1;
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				//logging(temp);
				pos.push(temp);
                temp = temp - 1;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						//logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp = s - 12;
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				//logging(temp);
				pos.push(temp);
                temp = temp - 12;
                continue
            }
			else{
					if (p[temp].piece.col != p[src].piece.col) {
						//logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        //console.log(pos.length);
		//console.log(pos);
        return 1;

    }
}
function validate(src, tgt) {
    //var val = p[src].piece.type.value;
    //var s, t, temp;
    //s = Number(src) + 12;
    //t = Number(src) + 24;
    //temp = pos.length;
    for (i = 0; i < pos.length; i++) {
        if (pos[i] === Number(tgt)) {
            return 1;
        }
    }

}
var move_num = 0;
var board_array = [];
var tP1,tP2;
function move(src, tgt) {
    if (p[tgt].piece.name === '' || (p[tgt].piece.col != p[src].piece.col)) {
        if (validate(src, tgt)) {
            col = $('#chessboard #' + p[src].cell.pos).index();
            row = $('#chessboard #' + p[src].cell.pos).parent().index();
            col = notation[col];
            ////logging(col);
            ////logging(8 - row + " ");
			move_data_object = []
            p[tgt].piece = p[src].piece;
			p[src].piece = epiece;
			p[src].act();
			p[tgt].act();	
			if(p[tgt].piece.type.value === 15){
				if(p[tgt].piece.col ==='white'){
					white_king_pos = Number(tgt);
				}
				else{
					console.log("trying to move black king\n");
					black_king_pos = Number(tgt);
				}
			}
			if( is_check(tgt)){
				if(p[tgt].piece.col === 'white' && white_on_check){
					p[src].piece = p[tgt].piece;
					p[tgt].piece = epiece;
					p[tgt].act();
					p[src].act();
					displayImage(p[src].piece.type.name,src);
					displayImage(p[tgt].piece.type.name,tgt);
					if(p[src].piece.type.value === 15){
						white_king_pos = Number(src);
						}
					return 0;
				}
			
					//return 0;
				
				if(p[tgt].piece.col === 'black' && black_on_check){
					p[src].piece = p[tgt].piece;
					p[tgt].piece = epiece;
					p[tgt].act();
					p[src].act();
					displayImage(p[src].piece.type.name,src);
					displayImage(p[tgt].piece.type.name,tgt);
					if(p[src].piece.type.value === 15){
						black_king_pos = Number(src);
					}
			
					return 0;
				}
				if(1){
					console.log("check");
					}
			}		
			move_num = move_num + 1;
            displayImage(p[src].piece.type.name,src);
            displayImage(p[tgt].piece.type.name,tgt);
            //logging("- ");
            col = $('#chessboard #' + p[tgt].cell.pos).index();
            row = $('#chessboard #' + p[tgt].cell.pos).parent().index();
            col = notation[col];
			//logging(p[tgt].piece.type.name);
            //logging(col);
            //logging(8 - row + " \n");
			move_data_object.push(p[src]);
			move_data_object.push(p[tgt]);
			move_data_json = JSON.stringify(move_data_object);
			////logging(move_data_json);
			$('td.selectable').unbind('click');
			for (t1=0; t1 < 144 ; t1++) {
				if(valid[t1]){
				if(p[t1].piece.type.value != 0) {
					//p[t1].act();
					t2 = JSON.stringify(p[t1]);
					board_array.push(p[t1]);
					////logging(t2);
				}
				}
			};
			
			$.ajax({
				type: 'POST',
				url: '/game?game_id=' + game_id,
				data: {
						gameid: game_id,
						moveData: JSON.stringify(move_data_object),
						currentBoard: JSON.stringify(board_array),
						move: move_num,
						game_status: 1
					  },
				dataType: 'json',
			})
			$('.circle_green').remove();
            return 1;
        }
    }
    if (p[src].piece.col === p[tgt].piece.col) {
        //logging("target source same team");
        return 0;
    } else {
        return 0;
    }
}

var pr = -1;

function exe1(val1) {
    if (p[val1].piece.type.name === "" && pr == -1) {

        return 4;
    }

    if (pr === -1) {
        pr = val1;
        //alert(val1);
		if(p[val1].piece.col != my_color){
			$('#chessboard #' + val1).toggleClass('selected not-selected');
			pr=-1;
			return 0;
		}
		valid_squares(val1);
        //$('td.selected').toggleClass('selected not-selected');
        //$('.circle_green').remove();	
        if (pos.length > 0) {
            //alert("back");


            for (i = 0; i <= pos.length; i++) {
           //$('#chessboard #' + pos[i]).css("background-color","blue");
                //$('#chessboard #' + pos[i]).html("<div class=\"circle_green\"></div>");
            }
            //return 0;
        }
        return 0;
    } else {
        /*alert(pr);*/
        //alert(val1);
        $('#chessboard #' + pr).toggleClass('selected not-selected');
        if (p[val1].piece.col === p[pr].piece.col) {
            pr = -1;
            $('.circle_green').remove();
            if (exe1(val1) === 4) {
                $('.circle_green').remove();
                return 0;
            } else {
                //$('#chessboard #' + val1).toggleClass('selected not-selected');
                e = val1;
                return 0;
            }
        }

        if (!move(pr, val1)) {
            if (p[val1].piece.type.name === "") {

                $('#chessboard #' + val1).toggleClass('selected not-selected');
                pr = -1;
                $('.circle_green').remove();
                return 1;
            }
			//$('#chessboard #' + val1).toggleClass('selected not-selected');
			
			//$('#chessboard #' + pr1).toggleClass('selected not-selected');
			if (p[val1].piece.col === p[pr].piece.col){
				pr = val1;
			}
			else{
			pr=-1;
			$('#chessboard #' + val1).toggleClass('selected not-selected');
			}
            return 1;
        }

        $('#chessboard #' + val1).toggleClass('selected not-selected');
        $('.circle_green').remove();
        pr = -1;
    }

}
function when_clicked() {
    var u;
    //$('#chessboard #' + e).toggleClass('selected not-selected');
    //$('.circle_green').remove();
    //$('td.selected').toggleClass('selected not-selected');
    //$('.circle_green').remove();
    if ($(this).hasClass('selected')) {

        $('.circle_green').remove();
        $(this).toggleClass('selected not-selected');
        pr = -1;

    } else {
        if (exe1($(this).attr('id')) === 4) {
            $('.circle_green').remove();
            return 0;
        } else {
            $(this).toggleClass('selected not-selected');
            e = $(this).attr('id');
            //alert(e);
            //$('.circle_green').remove();

            //exe1($(this).attr('id'));
        }
    }
}
if (turn){
$('td.selectable').unbind('click').on('click', when_clicked);
}
function connect() {
        source = new EventSource("game_stream?game_id=" + game_id);
        source.addEventListener("message", function(event) {
          //logging("message received " + event.data);
		  data = JSON.parse(event.data)
		  //console.log(data[0]);
		  //console.log(data[0].cell.pos,data[0].piece);
		  p[data[0].cell.pos].piece = data[0].piece;
		  p[data[0].cell.pos].act();
		  p[data[1].cell.pos].piece = data[1].piece;
		  p[data[1].cell.pos].act();
		  if(p[data[1].cell.pos].piece.type.value === 15){
				if( p[data[1].cell.pos].piece.col === 'white'){
					white_king_pos = Number(data[1].cell.pos);
					}
				else{
					black_king_pos = Number(data[1].cell.pos);
					}
			}
		  displayImage(p[data[0].cell.pos].piece.type.name,data[0].cell.pos);
          displayImage(p[data[1].cell.pos].piece.type.name,data[1].cell.pos);
		  $('td.selectable').unbind('click').on('click', when_clicked);
        }, false);

        source.addEventListener("newmove", function(event) {
			////logging("message received " + event.data);
			data = JSON.parse(event.data);
			
			////logging("message received " + event.data);
          ////logging("new move received " + data.move_data);
        }, false);

        source.addEventListener("open", function(event) {
          //logging("opening");
		
	
         }, false);

        source.addEventListener("error", function(event) {
          //logging("error");
        }, false);
    }
if (!!window.EventSource) {
        connect();
}
return game_object;
};