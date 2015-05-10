//login & registration functions
var Query_Service = function() {

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

    this.post_technical_query = function(form_data) {
		var request = url + "queries/post_technical_query";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.post_standards_query = function(form_data) {
		var request = url + "queries/post_standards_query";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }

    this.post_streaming_query = function(form_data) {
		var request = url + "queries/post_streaming_query";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.post_contact_us = function(form_data) {
		var request = url + "queries/contact_us";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }

    this.get_event_user = function() {
		var request = url + "login/get_logged_in_member" ;
        return $.ajax({url: request});
    }
 
}
//on page load if the user has logged in previously,
//log them in automatically

$(document).ready(function(){
	//automatic_login();
	$( ".main-nav ul li#pro_social" ).css( "inline-block", 'none' );
	$( ".main-nav ul li#profile" ).css( "inline-block", 'none' );
	$( ".main-nav ul li#cpd_live" ).css( "inline-block", 'none' );
});

//Register member
$(document).on("submit","form#technical_query",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#technical_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Query_Service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.post_technical_query(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				window.localStorage.setItem("query_subject", $("input[name=query_subject]").val());
				window.localStorage.setItem("query_text", $("input[name=query_text]").val());
				$("#technical_response").html('<div class="alert alert-success center-align">'+"You have successfully posted a technical query, we will get in touch with you through email. Thank you"+'</div>').fadeIn( "slow");
		
			}
			else
			{
				$("#technical_response").html('<div class="alert alert-danger center-align">'+"Something went wrong"+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#technical_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});



//standards query member
$(document).on("submit","form#standards_query_form",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#standards_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );

	$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Query_Service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.post_standards_query(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login

				window.localStorage.setItem("standard_query_subject", $("input[name=standard_query_subject]").val());
				window.localStorage.setItem("standards_query_text", $("input[name=standards_query_text]").val());
				$("#standards_response").html('<div class="alert alert-success center-align">'+"You have successfully posted a query, we will get in touch with you through email. Thank you"+'</div>').fadeIn( "slow");
		
			}
			else
			{
				$("#standards_response").html('<div class="alert alert-danger center-align">'+"Something went wrong"+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#standards_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});


//standards query member
$(document).on("submit","form#questionForm",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#streaming_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );

	$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Query_Service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.post_streaming_query(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login

				window.localStorage.setItem("speakers_name", $("input[name=speakers_name]").val());
				window.localStorage.setItem("streaming_comment_description", $("input[name=streaming_comment_description]").val());
				$("#streaming_response").html('<div class="alert alert-success center-align">'+"You have successfully posted a query, we will get in touch with you through email. Thank you"+'</div>').fadeIn( "slow");
		
			}
			else
			{
				$("#streaming_response").html('<div class="alert alert-danger center-align">'+"Something went wrong"+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#streaming_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});


//standards query member
$(document).on("submit","form#ContactFormHe",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#contact_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );

	$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Query_Service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.post_contact_us(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login

				window.localStorage.setItem("name", $("input[name=name]").val());
				window.localStorage.setItem("email", $("input[name=email]").val());
				window.localStorage.setItem("message", $("input[name=message]").val());
				$("#contact_response").html('<div class="alert alert-success center-align">'+"Thank you for contact us, we will address your issue and get back to you shortly."+'</div>').fadeIn( "slow");
		
			}
			else
			{
				$("#contact_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#contact_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});


//get a logged in user's details
function get_event_user()
{
	var service = new Query_Service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_event_user().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		var first_name = data.first_name;
		var email = data.email;
		var member_id = data.member_id;
		$("#member_id").val(member_id);
		$("#member_email").val(email);
		$("#first_name").val(first_name);
	});
}
