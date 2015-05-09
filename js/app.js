//login & registration functions
var Login_service = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        return $.ajax({url: url + "/" + id});
    }

    this.register_member = function(form_data) {
		var request = url + "login/register_user";
        return $.ajax({url: request, data: form_data, method: 'POST'});
    }

    this.login_member = function(email, password) {
		var request = url + "login/login_member/" + email + "/" + password;
        return $.ajax({url: request});
    }
}

//on page load if the user has logged in previously,
//log them in automatically
$(document).ready(function(){
	//automatic_login();
});

//automatic login
function automatic_login()
{
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get member's credentials
	var email = window.localStorage.getItem("member_email");
	var password = window.localStorage.getItem("member_password");
	
	service.findByName(email, password).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			window.localStorage.setItem("member_username", data.member_username);
			window.location.href = 'pages/profiles.html';
		}
		
		else
		{
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
}

//Register member
$(document).on("submit","form#register_member",function(e)
{
	e.preventDefault();
	$("#register_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		//get form values
		var form_data = new FormData(this);
		
		service.register_member(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				window.localStorage.setItem("member_email", $("input[name=email]").val());
				window.localStorage.setItem("member_password", $("input[name=password]").val());
				window.localStorage.setItem("member_phone", data.$("input[name=phone]").val());
				window.localStorage.setItem("member_first_name", $("input[name=first_name]").val());
				window.localStorage.setItem("member_last_name", $("input[name=last_name]").val());
				window.localStorage.setItem("member_company", data.$("input[name=company]").val());
				window.localStorage.setItem("gender_id", data.$("input[name=gender_id]").val());
				
				//display response message
				$("#register_response").html('<div class="alert alert-success center-align">'+data.result+'</div>').fadeIn( "slow");
			}
			
			else
			{
				$("#register_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#register_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});

//Login member
$(document).on("submit","form#login_member",function(e)
{
	e.preventDefault();
	$("#login_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		//get form values
		var email = $("input[name=email]").val();
		var password = $("input[name=password]").val();
		
		service.login_member(email, password).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				alert('login success');
			}
			else
			{
				$( "#loader-wrapper" ).addClass( "display_none" );
				$("#response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
			}
        });
	}
	
	else
	{
		$("#register_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});