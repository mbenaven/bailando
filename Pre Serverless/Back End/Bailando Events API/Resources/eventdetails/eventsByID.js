/*
 *  Lambda Function: EventsByID
 *  Developer: Matt Benavente
 *  API: Bailando Events 
 *  Resource/Method: /rsvp/POST
 * 
 *  Description: This is the AWS Lambda function used to act as the DB Client to query to the DynamoDB table 
 *  for the value entered in the search bar. (On the bottom, commented out is the test event)
 *      1. It recieves the the field value from the client entry (search)
 *      2. It queries DynamoDB for the record with that primary key value
 * 
 */

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    console.log("PARAMS---:"+parseInt(event.params.querystring.EVENT_ID));
    var params = {
            TableName: "EVENTS",
            Key:{
                "EVENT_ID": parseInt(event.params.querystring.EVENT_ID)
            }
    };
    
    //This gets the item from DyanmoDB with the table specified in the Params, and the value specified in the request
    docClient.get(params, function(err,data) {
        if (err){
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            //console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            callback(null, JSON.parse( JSON.stringify(data, null, 2)));
        }
    });
};


/* 
 *  Testing: API Call
 * 
 *  Use Postman or API Gateway after deploying the API
 *  API Call Example: https://ifjg2idqa4.execute-api.us-west-2.amazonaws.com/Test/eventdetails?EVENT_ID=1
 * 
 */

/* Testing: Lambda Function - Test Event
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