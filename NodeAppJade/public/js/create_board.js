function Create_Board(game_object){
var return_board = new Object();
var j = 0;
var u = 0;
var t = 0;
var c = [];
var p = [];
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
return_board.isSquareValid = isSquareValid
var my_color = 0;
var game_id = 0;
var create_data = 0;
var turn;


game_id = game_object.game_id;
my_color = game_object.my_color;
turn = game_object.turn;
console.log("game_object_id: " + game_id);
return_board.my_color = my_color;
return_board.game_id = game_id;
return_board.turn = turn
var valid = []
return_board.valid = valid;
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

function type(value, name) {
    this.value = value;
    this.name = t;
	//this.notation_text = n_text
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
return_board.cell = cell
return_board.type = type
return_board.piece = piece
return_board.par = par
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

var empty = new type(0, "");
var epiece = new piece('empty', empty, '');
return_board.epiece = epiece;
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
return_board.p = p
return_board.c = c
//function this_returns(){
return return_board;
//}
};