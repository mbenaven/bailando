
/*
    This is the code to submit the RSVP information to the Bailando Events API (/rsvp resource)
*/
/*
var apiURL = 'https://ifjg2idqa4.execute-api.us-west-2.amazonaws.com/Test/rsvp';
var rsvpResult; 
$(document).ready(function() {
    
    console.log("RSVP function has loaded")
    //Initializes the SDK generated by API Gateway 
    var apigClient = apigClientFactory.newClient();
    $("form[name='rsvpForm1']").submit(function(event) {
        console.log("A RSVP submission has ben made");
        //Get the form data
        var formData = {
            'eventidQS' : $('input[name=EVENT_ID_sub]').val(),
            'emailQS' : $('input[name=EMAIL_sub]').val(),
        };

        var params = {
            //This is where any head, path or querystring request params go. The key is the parameter named as defined in the API
            'eventidQS' :  $('input[name=EVENT_ID_sub]').val(),
            'emailQS' :  $('input[name=EMAIL_sub]').val()
        };

        var body = {
        };
        
        var additionalParams = {
             headers: {
             },
             queryParams: {
                'eventidQS' : $('input[name=EVENT_ID_sub]').val(),
                'emailQS' : $('input[name=EMAIL_sub]').val()
             }
        };

        apigClient.rsvpPost(params, body, additionalParams) 
            .then(function(result){
                rsvpResult = result.data;
                console.log(rsvpResult);
                console.log("Sucess: " + JSON.stringify(result));
            }).catch( function(result) {
                console.log("Error: " + JSON.stringify(result));
                console.log("The RSVP Result: " + JSON.stringify(rsvpResult));
                console.log("The RSVP Result: " + rsvpResult);
                console.log("Params: " + JSON.stringify(params));
                console.log("Addional Params: " + JSON.stringify(additionalParams));
                console.log("Body: " + JSON.stringify(additionalParams));
            }); 
        
        return false;
    });
}); 
*/