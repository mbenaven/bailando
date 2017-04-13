/*
    This is the AWS Lambda function used to act as the DB Client to query to the DynamoDB table 
    for the value entered in the search bar followed by the test event. 
        1. It recieves the the field value from the client entry (search)
        2. It queries DynamoDB for the record with that primary key value
*/
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    // The Lambda function expects the EVENT_ID from the client
    console.log("Params = " + parseInt(event.params.querystring.EVENT_ID));
    
    var params = {
            TableName: "EVENTS",
            Key:{
                "EVENT_ID": parseInt(event.params.querystring.EVENT_ID)
            }
    };
    
    //This gets the item from DyanmoDB based on the specified parameters
    docClient.get(params, function(err,data) {
        if (err){
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            callback(null, JSON.parse( JSON.stringify(data, null, 2)));
        }
    });
};


/* Test event
{
	"body-json":{},
	"params": {
		"path": {},
		"querystring": {
			"EVENT_ID": "1"
		}
	}
}	
*/