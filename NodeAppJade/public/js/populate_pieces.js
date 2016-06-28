function Populate_pieces(Board){


type = Board.type;
piece = Board.piece;
p = Board.p;
c = Board.c;
par = Board.par;
valid = Board.valid;
my_color = Board.my_color;
game_id = Board.game_id;
turn =Board.turn;

function logging(text) {
    $('#logtext').append(text);

}

return_obj = new Object();

var wrook = new type(5, 'R');
var wrook1 = new piece('white', wrook, 'wrook1');
var wrook2 = new piece('white', wrook, 'wrook2');

var wknght = new type(3, "N");
var wknght1 = new piece('white', wknght, 'wknght1');
var wknght2 = new piece('white', wknght, 'wknght2');

var wbshp = new type(4, "B");
var wbshp1 = new piece('white', wbshp, 'wbshp1');
var wbshp2 = new piece('white', wbshp, 'wbshp2');

var wqueen = new type(8, "Q");
var wqueen1 = new piece('white', wqueen, 'wqueen');

var wking = new type(15, "K");
var wking1 = new piece('white', wking, 'wking');

var wpawn = new type(1, "Pawn");
var wpawn1 = new piece('white', wpawn, 'wpawn1');
var wpawn2 = new piece('white', wpawn, 'wpawn2');
var wpawn3 = new piece('white', wpawn, 'wpawn3');
var wpawn4 = new piece('white', wpawn, 'wpawn4');
var wpawn5 = new piece('white', wpawn, 'wpawn5');
var wpawn6 = new piece('white', wpawn, 'wpawn6');
var wpawn7 = new piece('white', wpawn, 'wpawn7');
var wpawn8 = new piece('white', wpawn, 'wpawn8');



var brook = new type(5, "R");
var brook1 = new piece('black', brook, 'brook1');
var brook2 = new piece('black', brook, 'brook2');

var bknght = new type(3, "N");
var bknght1 = new piece('black', bknght, 'bknght1');
var bknght2 = new piece('black', bknght, 'bknght2');

var bbshp = new type(4, "B");
var bbshp1 = new piece('black', bbshp, 'bbshp1');
var bbshp2 = new piece('black', bbshp, 'bbshp2');

var bqueen = new type(8, "Q");
var bqueen1 = new piece('black', bqueen, 'bqueen1');

var bking = new type(15, "K");
var bking1 = new piece('black', bking, 'bking1');

var bpawn = new type(1, "P");
var bpawn1 = new piece('black', bpawn, 'bpawn1');
var bpawn2 = new piece('black', bpawn, 'bpawn2');
var bpawn3 = new piece('black', bpawn, 'bpawn3');
var bpawn4 = new piece('black', bpawn, 'bpawn4');
var bpawn5 = new piece('black', bpawn, 'bpawn5');
var bpawn6 = new piece('black', bpawn, 'bpawn6');
var bpawn7 = new piece('black', bpawn, 'bpawn7');
var bpawn8 = new piece('black', bpawn, 'bpawn8');

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
  url: "/piece?game_id=" + game_id,
  data: data,
  //type: GET,
  success: function(data){
	data = JSON.parse(data);
	load_board_with_json(data);
	Make_Draggables();
	//logging(data)
	}
});
function Make_Draggables(){
$('.drag').draggable({
  revert: 'invalid',
  helper: 'clone',
  //cursor: 'move',
  start: function() {
    //logging("dragging_started\n");
    $(this).parent().click();
    //$('#27').droppable( "option", "disabled", true )
  },
  	stop: function(){
      //logging("draggin_stopped\n");
      //$(this).parent().click();
      //$(this).draggable('option','revert','invalid');
    }
});
}
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


return_obj.displayImage = displayImage;

return_obj.p = p

return return_obj;
}