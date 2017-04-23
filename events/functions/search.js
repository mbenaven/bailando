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

'use strict';

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

module.exports.byid = (event, context, callback) => {
    const params = {
        TableName: "LD_EVENTS",
        Key:{
            "EVENT_ID": event.pathParameters.id
        }
    };
    db.get(params, (error, result) => {
        if (error){
            console.error(error);
            callback(new Error('Couldn\'t fetch the event.'));
            return;
        } 
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        };
        callback(null, response);
    });
};


module.exports.byday = (event, context, callback) => {
    var params = {
        ExpressionAttributeValues: {
            ":v1": {
            S: event.pathParameters.day
            }
        }, 
        KeyConditionExpression: "DAY_OF_WEEK = :v1", 
        TableName: "LD_EVENTS",
        IndexName: "DAY_OF_WEEK-index"
    };
    console.log("Params: " + params);
    db.query(params, (error, result) => {
        if (error) console.log(error, error.stack); 
        else{
            console.log("GetItem succeeded:", JSON.stringify(result, null, 2));
            callback(null, JSON.parse( JSON.stringify(result, null, 2)));
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