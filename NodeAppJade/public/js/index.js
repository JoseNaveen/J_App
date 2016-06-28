/**
 * http://usejsdoc.org/
 */
$(document).ready(function(){
	var Board;
	var itemCount = 1;
	var data=0;
	$.ajax({
		dataType: "json",
		url: "/get_game_list",
		data: data,
		success: function(data){
			//data = JSON.parse(data);
			var i = 0;
			var newItem = [];
			while(data[i]){
				$('#Empty_Game_List').remove()
				newItem[i] = $("<div class=\"hvr-reveal item not-selected\" id=\"inner2\"><span class=\"item_class\">"+ data[i] +"</span></div>").hide();
				$('#gamelist').prepend(newItem[i]);
				newItem[i].fadeIn();
				i++;
			}

			$('.item').on('click',function(){
				$('.selected').toggleClass('selected not-selected')
				$(this).toggleClass('selected not-selected')
				if($(this).hasClass('selected')){
					selected_game = $(this).children().text()
					$('#load').prop('disabled',false)
				}
				else{
					$('#load').prop('disabled',true)
					selected_game = undefined;
				}
			})

		}
	})
	function create(game_object){
		$(this).prop('value','Disconnect')
		//$('.board-container').fadeIn();
		$.getScript('/js/create_board.js',function(){
			Board = new Create_Board(game_object);
			$.getScript('/js/populate_pieces.js',function(){
				Game_Board = new Populate_pieces(Board);
				$.getScript('/js/game_logic.js', function(){
					Logic = new game_logic(Board,Game_Board);
					$('.board-container').fadeIn();
				});
			});			
		});
	}
	$('#connect').on('click',function(){
		$.ajax({
			dataType: "json",
			url: "/create",
			//data: "0",
			success: function(data){
				//console.log(data);
				data = JSON.parse(data);
				//console.log(data);
				game_id = data.game_id;
				my_color = data.my_color;
				turn = data.turn;

				if(!data.game_status){
					$('#Empty_Game_List').remove()
					newListItem = $("<div class=\"hvr-reveal item not-selected\" id=\"inner2\"><span class=\"item_class\">"+ game_id +"</span></div>")
					$('#gamelist').prepend(newListItem).fadeIn()
					newListItem.append(" waiting \n")//
							//+"created game: "+ game_id);
					pre_game_stream(data);
				}
				else{
					newListItem = $("<div class=\"hvr-reveal item not-selected\" id=\"inner2\"><span class=\"item_class\">"+ game_id +"</span></div>")
					$('#gamelist').prepend(newListItem).fadeIn()
					create(data);
				}
			}
		});
	});

	$('#load').on('click',function(){

		$.ajax({
			dataType: 'json',
			url: '/load?game_id=' + selected_game,
			success: function(data){
				//console.log(data);
				data = JSON.parse(data);
				//console.log(data);
				game_id = data.game_id;
				my_color = data.my_color;
				turn = data.turn;

				if(!data.game_status){
					$('#logtext').append("waiting for player to join\n"//
							+"created game: "+ game_id)
							pre_game_stream(data);
				}
				else{
					create(data);
				}
			}
		});
	});
	$('#load').prop('disabled', true);
	function pre_game_stream(game_object){
		stream = new EventSource("pre_stream?game_id=" + game_object.game_id);
		stream.addEventListener("data",function(data){
			$('#logtext').append("\n" + data)
		},false)
		stream.addEventListener("game_start",function(data){
			$('#logtext').append("second player joined")
			create(game_object);
			stream.close();
		},false);
	}

});