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
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }

    this.login_member = function(email, password) {
		var request = url + "login/login_member/" + email + "/" + password;
        return $.ajax({url: request});
    }
     this.getProfileDetails = function() {
		var request = url + "login/get_client_profile";
        return $.ajax({url: request});
    }

    this.get_event_user = function() {
		var request = url + "login/get_logged_in_member" ;
        return $.ajax({url: request});
    }
}

//on page load if the user has logged in previously,
//log them in automatically
$(document).ready(function(){
	
	$( ".main-nav ul li#pro_social" ).css( "display", 'none' );
	$( ".main-nav ul li#profile" ).css( "display", 'none' );
	$( ".main-nav ul li#cpd_live" ).css( "display", 'none' );
	
	automatic_login();
});

function get_profile_details()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	
	service.getProfileDetails().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#my_profile" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
		
		else
		{

		}
	});
}

//automatic login
function automatic_login()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get member's credentials
	var email = window.localStorage.getItem("member_email");
	var password = window.localStorage.getItem("member_password");
	
	service.login_member(email, password).done(function (employees) {
		var data = jQuery.parseJSON(employees);//alert(email+' '+password);
		
		if(data.message == "success")
		{
			//display login items
			$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
			$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
			$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );
			$( "#login_icon" ).html( '<a href="my-profile.html" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" /><span>Profile</span></a>' );
		}
		else
		{
			$("#response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
		}
		
		$( "#loader-wrapper" ).addClass( "display_none" );
	});
}

//Register member
$(document).on("submit","form#register_member",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
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
		
		
		service.register_member(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				window.localStorage.setItem("member_email", $("input[name=email]").val());
				window.localStorage.setItem("member_password", $("input[name=password]").val());
				window.localStorage.setItem("member_phone", $("input[name=phone]").val());
				window.localStorage.setItem("member_first_name", $("input[name=first_name]").val());
				window.localStorage.setItem("member_last_name", $("input[name=last_name]").val());
				window.localStorage.setItem("member_company", $("input[name=company]").val());
				window.localStorage.setItem("gender_id", $("input[name=gender_id]").val());
			}
			alert(data.result);
			
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

function HideModalPopup() 
{
 $("#ModalBehaviour").hide(); 
}

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
				//display login items
				$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
				$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
				$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );
				$("#login_response").html('<div class="alert alert-success center-align">'+"You have successfully logged in to your account. Please close this screen using the x button"+'</div>').fadeIn( "slow");
		

				
				$( "#login_icon" ).html( '<a href="my-profile.html" onClick="get_profile_details()" class="close-popup"><img src="images/icons/white/user.png" alt="" title="" /><span>Profile</span></a>' );

				get_event_user();
			}
			else
			{
				$("#response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
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

//get a logged in user's details
function get_event_user()
{
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	service.get_event_user().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		var first_name = data.first_name;
		var email = data.email;
		var member_id = data.member_id;
		
		$( "#questionForm_email" ).val( email );
		$( "#questionForm_user" ).val( first_name );
		$( "#questionForm_id" ).val( member_id );
		
		$( "#app_user" ).html( first_name );
	});
}

//get a logged in user's details
function get_social_user()
{
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	service.get_event_user().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		var email = data.email;
		var member_id = data.member_id;
		
		$( "#social_member_email1" ).val( email );
		$( "#social_member_id1" ).val( member_id );
		
		$( "#social_member_email2" ).val( email );
		$( "#social_member_id2" ).val( member_id );
		
	});
}
