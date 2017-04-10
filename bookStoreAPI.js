var dataResult;
$(document).ready(function() {

    var apigClient = apigClientFactory.newClient();
    $('form').submit(function(event) {
        console.log("A submission has ben made");
        //get the form data
        //there are many ways to get this using jquery (you can use the class or id also)
        var formData = {
            'bookid' : $('input[name=bookid]').val()
        };

        var params = {
            //This is here any head, pathh or querystring request params go. The key is the parameter named as defined in the API
            'bookid' :  $('input[name=bookid]').val()
        };

        var body = {
            //Where you define the body of the request
        };
        
        var additionalParams = {
             headers: {

             },
             queryParams: {
                 'bookid' : $('input[name=bookid]').val()
             }
        };

        apigClient.bookdetailsGet(params, body, additionalParams) 
            .then(function(result){
                console.log(result.data);
                dataResult = result.data;
                var resultStr = 'Book ID: <b>'+result.data.Item.bookid+'</b><br>'+'Book Name: <b>'+result.data.Item.bookname+'</b><br>'+'Author: <b>'+result.data.Item.author+'</b><br>';
                console.log(resultStr);
                $('#results').html(resultStr);
            }).catch( function(result) {
                cosnole.log('error');
            });
        
        return false;
    });

});


        /*
        apiGateway.core.utils.assertParametersDefined(params, ['bookid'], ['body']);
        
        var bookdetailsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/bookdetails').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['bookid']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(bookdetailsGetRequest, authType, additionalParams, config.apiKey);
        };

    }

}




 /*How we call API from statis resource    

 apigClient.bookdetailsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['bookid'], ['body']);
        
        var bookdetailsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/bookdetails').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['bookid']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(bookdetailsGetRequest, authType, additionalParams, config.apiKey);
    }; 
*/