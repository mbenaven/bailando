
/*
    This is the code to submit the RSVP information to the Bailando Events API (/rsvp resource)
*/
var rsvpURL = 'https://ifjg2idqa4.execute-api.us-west-2.amazonaws.com/Test/rsvp';
var rsvpResult; 
$(document).ready(function() {
    console.log("function loaded");
$('#submitID').on('click', function(){
    console.log("submit button clicked");
    $.ajax({
        type: 'POST',
        url: rsvpURL,
        data: JSON.stringify({'eventidQS': $('input[name=EVENT_ID_sub]').val()}, {'emailQS': $('input[name=EMAIL_sub]').val()}),
        contentType: "application/json",
        
        success: function(data){
            console.log("Post has been made :)");

        }
    });
    return false;  //This is so that the AJAX request can complete before any page refesh occurs
});
});
