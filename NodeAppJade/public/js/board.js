$(document).ready(function(){
var x = document.getElementsByTagName("H1")[0].innerText;



var e = 0;
var i = 0;
var j = 0;
var u = 0;
var my_color = 'white';
var c = [];
var p = [];
var pos = [];
var valid = [];
var notation = ["a", "b", "c", "d", "e", "f", "g", "h"];
function logging(text) {
    $('#logtext').append(text);
}
///////////////////
function connect() {
        source = new EventSource("game_stream");
        source.addEventListener("message", function(event) {
          logging(event.data);
        }, false);

        source.addEventListener("connecttime", function(event) {
          logging("Connection was last established at: " + event.data);
        }, false);

        source.addEventListener("open", function(event) {
          logging("opening");
		
	
         }, false);

        source.addEventListener("error", function(event) {
          logging("error");
        }, false);
    }
if (!!window.EventSource) {
        connect();
}
///////////////////
/////////////////create game id////////////////////
var data=0;
$.ajax({
dataType: "json",
url: "/create",
data: "hello",
success: function(data){
//logging(data);
data = JSON.parse(data);
logging(data.game_id);
}
});
///////////////////////////////////////////////////

function isSquareValid(s) {
    var i = 0;
    var n = 26,
        m = 12;
    if (s < 26 || s > 117) {
        return 0;
    }
    while (s >= n) {
        n = n + m;
        i = 1;
    }
    if (i) {
        if (s <= n - m + 7) {
            return 1;
        } else {
            return 0;
        }
    } else {
        if (s < n + 8) {
            return 0;
        } else {
            return 1;
        }
    }

}
for (i = 0; i < 144; i++) {
    valid[i] = isSquareValid(i);
}
// A cell has two attributes. Colour and position.
// Colour can be white or black and position is a number  

function cell(clr, pos) {
    this.clr = clr;
    this.pos = pos;
    //this.notation = getnotation.pos; //get notaion from another json object
}

function type(value, t) {
    this.value = value;
    this.name = t;
}

function piece(col, type, name) {
    this.type = type;
    this.col = col;
    this.name = name;
}

function par(cell, piece) {
    this.cell = cell;
    this.piece = piece;
}

par.prototype.act = function () {
    $('#chessboard #' + this.cell.pos).addClass(this.cell.clr);
    $('#chessboard #' + this.cell.pos).text(this.piece.name);
};
// Creating all the 64 cells required for the board
for (i = 0; i < 118; i = i + 12) {
    for (j = 0; j < 12; j++) {
        if (u === 0) {
            c[i + j] = new cell('wt', i + j);
            p[i + j] = 0;
            n = u;
            u = 1;
        } else {
            c[i + j] = new cell('bk', i + j);
            p[i + j] = 0;
            n = u;
            u = 0;
        }
    }
    u = n;
}

function logging(text) {
    $('#logtext').append(text);

}
logging(x);

var pos = [];

function valid_squares(src) {
    pos = [];
    //("valid_squares func started");
    //alert(src);
    var s = Number(src);
    var temp;
    if (p[src].piece.type.value === 15) { //king
    if (valid[s + 12] && ((p[s + 12].piece.type.value) === 0)){
    pos.push(s + 12)
    }
    
    if (valid[s + 12 + 1]&& ((p[s + 12 + 1].piece.type.value) === 0)){
    pos.push(s + 12 + 1)
    }
    if (valid[s + 12 - 1]&& ((p[s + 12 - 1].piece.type.value) === 0)){
    pos.push(s + 12 - 1)
    }
    if (valid[s + 1]&& ((p[s + 1].piece.type.value) === 0)){
    pos.push(s + 1)
    }
    if (valid[s - 1]&& ((p[s - 1].piece.type.value) === 0)){
    pos.push(s - 1)
    }
    if (valid[s - 12]&& ((p[s - 12].piece.type.value) === 0)){
    pos.push(s - 12)
    }
    if (valid[s - 12 - 1]&& ((p[s - 12 - 1].piece.type.value) === 0)){
    pos.push(s - 12 - 1)
    }
    if (valid[s - 12 + 1]&& ((p[s - 12 + 1].piece.type.value) === 0)){
    pos.push(s - 12 + 1)
    }
    return 1;
    }
    if (p[src].piece.type.value === 3) { // for Knight
    if (valid[s + 24 + 1] && ((p[s + 24 + 1].piece.type.value) === 0)){
    pos.push(s + 24 + 1)
    }
    
    if (valid[s + 24 - 1]&& ((p[s + 24 - 1].piece.type.value) === 0)){
    pos.push(s + 24 - 1)
    }
    if (valid[s - 24 - 1]&& ((p[s - 24 - 1].piece.type.value) === 0)){
    pos.push(s - 24 - 1)
    }
    if (valid[s - 24 + 1]&& ((p[s - 24 + 1].piece.type.value) === 0)){
    pos.push(s - 24 + 1)
    }
    if (valid[s + 12 + 2]&& ((p[s + 12 + 2].piece.type.value) === 0)){
    pos.push(s + 12 + 2)
    }
    if (valid[s + 12- 2]&& ((p[s + 12- 2].piece.type.value) === 0)){
    pos.push(s + 12 - 2)
    }
    if (valid[s - 12 - 2]&& ((p[s - 12 - 2].piece.type.value) === 0)){
    pos.push(s - 12 - 2)
    }
    if (valid[s - 12 + 2]&& ((p[s - 12 + 2].piece.type.value) === 0)){
    pos.push(s - 12 + 2)
    }
    return 1;
    }
    if (p[src].piece.type.value === 4) {// for Bishop
    	temp =  s - 12 + 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp - 12 + 1;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp =  s - 12 - 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp - 12 - 1;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp =  s + 12 + 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp + 12 + 1;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp =  s + 12 - 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp + 12 - 1;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
      return 1;
    }
    if (p[src].piece.type.value === 8) { // for queen
    temp = s + 12;
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp + 12;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp = s + 1;
        

        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp + 1;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }

        temp = s - 1;
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp - 1;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp = s - 12;
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp - 12;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
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
				logging(temp);
				pos.push(temp);
                temp = temp - 12 + 1;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp =  s - 12 - 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp - 12 - 1;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp =  s + 12 + 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp + 12 + 1;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp =  s + 12 - 1
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp + 12 - 1;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        
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
            if (p[s + 12 + 1].piece.col === 'black') {
                pos.push(s + 12 + 1);
            }
        }
        if (valid[s + 12 - 1] === 1) {
            if (p[s + 12 - 1].piece.col === 'black') {
                pos.push(s + 12 - 1);
            }
        }
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
        return 1;
    }
    if (p[src].piece.type.value === 5) { //for rook
        //logging("you clicked on rook\n")
        temp = s + 12;
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp + 12;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp = s + 1;

        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp + 1;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }

        temp = s - 1;
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp - 1;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        temp = s - 12;
        while (valid[temp] === 1) {

            if (Number(p[temp].piece.type.value) === 0) {
				logging(temp);
				pos.push(temp);
                temp = temp - 12;
                continue
            }
			else{
					if (p[temp].piece.col != 'my_color') {
						logging(temp);
						pos.push(temp);
						break;
					}
					break;
				}
            
        }
        //alert(pos.length);
        return 1;

    }
}

function validate(src, tgt) {
    var val = p[src].piece.type.value;
    var s, t, temp;
    s = Number(src) + 12;
    t = Number(src) + 24;
    temp = pos.length;
    for (i = 0; i < pos.length; i++) {
        if (pos[i] === Number(tgt)) {
            return 1;
        }
    }

}

var wrook = new type(5, 'wrook');
var wrook1 = new piece('white', wrook, 'wrook1');
var wrook2 = new piece('white', wrook, 'wrook2');

var wknght = new type(3, "wknght");
var wknght1 = new piece('white', wknght, 'wknght1');
var wknght2 = new piece('white', wknght, 'wknght2');

var wbshp = new type(4, "wbshp");
var wbshp1 = new piece('white', wbshp, 'wbshp1');
var wbshp2 = new piece('white', wbshp, 'wbshp2');

var wqueen = new type(8, "wqueen");
var wqueen1 = new piece('white', wqueen, 'wqueen');

var wking = new type(15, "wking");
var wking1 = new piece('white', wking, 'wking');

var wpawn = new type(1, "wpawn");
var wpawn1 = new piece('white', wpawn, 'wpawn1');
var wpawn2 = new piece('white', wpawn, 'wpawn2');
var wpawn3 = new piece('white', wpawn, 'wpawn3');
var wpawn4 = new piece('white', wpawn, 'wpawn4');
var wpawn5 = new piece('white', wpawn, 'wpawn5');
var wpawn6 = new piece('white', wpawn, 'wpawn6');
var wpawn7 = new piece('white', wpawn, 'wpawn7');
var wpawn8 = new piece('white', wpawn, 'wpawn8');



var brook = new type(5, "brok");
var brook1 = new piece('black', brook, 'brook1');
var brook2 = new piece('black', brook, 'brook2');

var bknght = new type(3, "bknght");
var bknght1 = new piece('black', bknght, 'bknght1');
var bknght2 = new piece('black', bknght, 'bknght2');

var bbshp = new type(4, "bbshp");
var bbshp1 = new piece('black', bbshp, 'bbshp1');
var bbshp2 = new piece('black', bbshp, 'bbshp2');

var bqueen = new type(8, "bqueen");
var bqueen1 = new piece('black', bqueen, 'bqueen1');

var bking = new type(15, "bking");
var bking1 = new piece('black', bking, 'bking1');

var bpawn = new type(1, "bpawn");
var bpawn1 = new piece('black', bpawn, 'bpawn1');
var bpawn2 = new piece('black', bpawn, 'bpawn2');
var bpawn3 = new piece('black', bpawn, 'bpawn3');
var bpawn4 = new piece('black', bpawn, 'bpawn4');
var bpawn5 = new piece('black', bpawn, 'bpawn5');
var bpawn6 = new piece('black', bpawn, 'bpawn6');
var bpawn7 = new piece('black', bpawn, 'bpawn7');
var bpawn8 = new piece('black', bpawn, 'bpawn8');




var empty = new type(0, "");
var epiece = new piece('empty', empty, '');
for (t = 26; t < 118; t = t + 12) {
    for (i = 0; i < 8; i++) {
        p[t + i] = new par(c[t + i], epiece);
    }
}
for (t = 26; t < 118; t = t + 12) {
    for (i = 0; i < 8; i++) {
        p[t + i].act();
    }
}

var t1,
t2,
t3,
t4;
var board_array = []
t1=0;
var board_data;
//white images
var wking_image = "<img class=\"drag\" height=\"42\" width=\"42\" src='https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png'>";
var wqueen_image = "<img class=\"drag\" height=\"42\" width=\"42\" src='https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png'>";

var wbishop_image = "<img class=\"drag\" height=\"42\" width=\"42\" src='https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png'>";

var wrook_image = "<img class=\"drag\" height=\"42\" width=\"42\" src='https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png'>";

var wknight_image = "<img class=\"drag\" height=\"42\" width=\"42\" src='https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png'>";

var wpawn_image = "<img class=\"drag\" height=\"42\" width=\"42\" src='https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png'>";


//black images

var bking_image = "<img class=\"drag\" height=\"42\" width=\"42\" src='https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png'>";


var bqueen_image = "<img class=\"drag\" height=\"42\" width=\"42\" src='https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png'>";

var bbishop_image = "<img class=\"drag\" height=\"42\" width=\"42\" src='https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png'>";

var brook_image = "<img class=\"drag\" height=\"42\" width=\"42\" src='https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png'>";

var bknight_image = "<img class=\"drag\" height=\"42\" width=\"42\" src='https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png'>";

var bpawn_image = "<img class=\"drag\" height=\"42\" width=\"42\" src='https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png'>";
//document.getElementById("113").innerHTML = wqueen_image;
//document.getElementById("114").innerHTML = wking_image;
//logging(p[114].piece.type.value);
function displayImage(PieceName,Loc){
    switch (PieceName) {
                case "wqueen":
                    document.getElementById(Loc).innerHTML = wqueen_image;
                    break;
                case "wking":
                    document.getElementById(Loc).innerHTML = wking_image;
                    break;
                case "wrook":
                    document.getElementById(Loc).innerHTML = wrook_image;
                    break;
                case "wbshp":
                    document.getElementById(Loc).innerHTML = wbishop_image;
                    break;
                case "wknght":
                    document.getElementById(Loc).innerHTML = wknight_image;
                    break;
                case "wpawn":
                    document.getElementById(Loc).innerHTML = wpawn_image;
                    break;
                case "bqueen":
                    document.getElementById(Loc).innerHTML = bqueen_image;
                    break;
                case "bking":
                    document.getElementById(Loc).innerHTML = bking_image;
                    break;
                case "brok":
                    document.getElementById(Loc).innerHTML = brook_image;
                    break;
                case "bbshp":
                    document.getElementById(Loc).innerHTML = bbishop_image;
                    break;
                case "bknght":
                    document.getElementById(Loc).innerHTML = bknight_image;
                    break;
                case "bpawn":
                    document.getElementById(Loc).innerHTML = bpawn_image;
                    break;
        		case "":
            		$("#chessboard #" + Loc).children("img").remove();
            		
            
    }
}
function load_board_with_json(loaded_board_objects){
for (t1=0; t1 < loaded_board_objects.length; t1++){
    t3 = loaded_board_objects[t1].cell.pos;
    t4 = loaded_board_objects[t1].piece;
    p[t3] = new par(c[t3],t4);
    p[t3].act();
}
for (t1=0; t1 < 144; t1++){
    if(valid[t1]) {
        if(p[t1].piece.type.value){
            displayImage(p[t1].piece.type.name,t1);
			if(p[t1].piece.col != my_color){
				//$('#chessboard #' + t1).removeClass('selectable');
				}
        }
    }
};
};
var data = 0;
$.ajax({
  dataType: "json",
  url: "/piece",
  data: data,
  success: function(data){
	data = JSON.parse(data);
	load_board_with_json(data);
	Make_Draggables();
	//logging(data)
	}
});
var col, row;
var move_data_json,
	move_data_object = [];

function move(src, tgt) {
    if (p[tgt].piece.name === '' || (p[tgt].piece.col != p[src].piece.col)) {
        //alert('tgt empty');

        if (validate(src, tgt)) {
            col = $('#chessboard #' + p[src].cell.pos).index();
            row = $('#chessboard #' + p[src].cell.pos).parent().index();
            col = notation[col];
            logging(col);
            logging(8 - row + " ");
			move_data_object = []
            p[tgt].piece = p[src].piece;
            p[src].piece = epiece;
            p[src].act();
            p[tgt].act();
            displayImage(p[src].piece.type.name,src);
            displayImage(p[tgt].piece.type.name,tgt);
            logging("- ");
            col = $('#chessboard #' + p[tgt].cell.pos).index();
            row = $('#chessboard #' + p[tgt].cell.pos).parent().index();
            col = notation[col];
            logging(col);
            logging(8 - row + " \n");
			move_data_object.push(p[src]);
			move_data_object.push(p[tgt]);
			move_data_json = JSON.stringify(move_data_object);
			logging(move_data_json);
			$.ajax({
				type: 'POST',
				url: '/game',
				data: {
						gameid: "some_number",
						jsonData: JSON.stringify(move_data_object)
					  },
				dataType: 'json',
			});//alert('move returning 1');
            $('.circle_green').remove();
            return 1;
        }
    }
    if (p[src].piece.col === p[tgt].piece.col) {
        logging("target source same team");
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
			pr=-1;
			//$('#chessboard #' + pr1).toggleClass('selected not-selected');
			if (p[val1].piece.col === p[pr].piece.col){
				pr = val1;
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
$('td.selectable').on('click', when_clicked);
//$(".draggable").draggable();
function Make_Draggables(){
$('.drag').draggable({
  revert: 'invalid',
  helper: 'clone',
  //cursor: 'move',
  start: function() {
    logging("dragging_started\n");
    $(this).parent().click();
    //$('#27').droppable( "option", "disabled", true )
  },
  	stop: function(){
      logging("draggin_stopped\n");
      //$(this).parent().click();
      //$(this).draggable('option','revert','invalid');
    }
});
}
//Make_Draggables();
$('.selectable').droppable({
  tolerance: 'intersect',
  greedy: true,
  drop: function(event, ui){
  $(this).click();
  var drop_p = $(this).offset();
  var drag_p = ui.draggable.offset();
  var left_end = drop_p.left - drag_p.left + 4;
  var top_end = drop_p.top - drag_p.top + 2;
  ui.draggable.animate({
      top: '+=' + top_end,
      left: '+=' + left_end
  });
  //$(ui.draggable).appendTo(this);
  Make_Draggables();
}
});
});
