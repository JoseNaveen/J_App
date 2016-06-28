/**
 * http://usejsdoc.org/
 */
$('#SignUpDone').on('shown.bs.modal', function (e) {
	// do whatever you want...
	console.log("success")
})
function SignUpValidate(){
	console.log("jesafd")
}
$('#signinform').submit(function(e1){
	var postDataSignIn = $(this).serializeArray();
	$.ajax({
		url: "/signin",
		type:"POST",
		data: postDataSignIn,
		success: function(data){
			data = JSON.parse(data);
			if(data.result === "success"){
				window.location.href = "home";
				return;
			}
			else{
				ErrMsg = $("<label>Invalid Login</label>");
				$('#field1').prepend(ErrMsg);
			}
		}
	});
	e1.preventDefault();
});
$('#signupform').submit(function(e){
	//console.log("Submitted")
	var postData = $(this).serializeArray();

	$.ajax({
		url: "/signup",
		type:"POST",
		data: postData,
		success: function(data){
			data = JSON.parse(data);
			if(data.result=== 'success'){
				$(".modal-title").text('').append('Sign In')
				$('#field3').remove();
				$("#sbmt").prop('value',"Sign In")
				$('#signupform').unbind();
				$('#signupform').submit(function(e1){
					var postDataSignIn = $(this).serializeArray();
					$.ajax({
						url: "/signin",
						type:"POST",
						data: postDataSignIn,
						success: function(data){
							data = JSON.parse(data);
							if(data.result === "success"){
								window.location.href = "home";
								return
							}
							else{
								ErrMsg = $("<label>Invalid Login</label>")
								$('#field1').prepend(ErrMsg)
							}
						}
					});
					e1.preventDefault();
				})

				return;
			}

			//$(this).submit();

		}
	})
	e.preventDefault();
	//$(this).unbind();
});