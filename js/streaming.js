/* Function to check for network connectivity */

function is_connected()
{
	navigator.network.isReachable(base_url, function(status) {
		var connectivity = (status.internetConnectionStatus || status.code || status);
		if (connectivity === NetworkStatus.NOT_REACHABLE) {
			return false;
			//alert("No internet connection - we won't be able to show you any maps");
		} else {
			return true;
			//alert("We can reach Google - get ready for some awesome maps!");
		}
	});
}

var EmployeeStreamingService = function() {

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

    this.findByName = function() {
		var request = url + "streaming/get_streaming_event" ;
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
	//automatic_login();
	get_event_user();
});

function get_streaming_event()
{
	var service = new EmployeeStreamingService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.findByName().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#streaming_now" ).html( data.result );
			
		}
		
		else
		{

		}
	});
}


//get a logged in user's details
function get_event_user()
{
	var service = new EmployeeStreamingService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_event_user().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		var first_name = data.first_name;
		var email = data.email;
		var member_id = data.member_id;
		
	});
}
