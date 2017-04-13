/*  
    This is the JavaScript that allows the webpage to act as the API Client. 
    It gets the data from the search bar and sends it to the API Gateway, which will 
    then trigger the Lambda Function (EventsByID.js) to query the DynamoDB table for
    the record with the value provided in the search bar.
*/

var dataResult;
$(document).ready(function() {

    var apigClient = apigClientFactory.newClient();
    $('form').submit(function(event) {
        console.log("A submission has ben made");
        //Get the form data
        var formData = {
            'EVENT_ID' : $('input[name=EVENT_ID]').val()
        };

        var params = {
            //This is where any head, path or querystring request params go. The key is the parameter named as defined in the API
            'EVENT_ID' :  $('input[name=EVENT_ID]').val()
        };

        var body = {
        };
        
        var additionalParams = {
             headers: {
             },
             queryParams: {
                 'EVENT_ID' : $('input[name=EVENT_ID]').val()
             }
        };

        apigClient.eventdetailsGet(params, body, additionalParams) 
            .then(function(result){
                console.log(result.data);
                dataResult = result.data;
                var resultStr = 'Event ID: <b>'+result.data.Item.EVENT_ID+'</b><br>'+'Event Name: <b>'+result.data.Item.EVENT_NAME+'</b><br>'+'Venue Name: <b>'+result.data.Item.VENUE_NAME+'</b><br>';
                console.log(resultStr);
                $('#results').html(resultStr);
            }).catch( function(result) {
                console.log('error');
            });
        
        return false;
    });
});


