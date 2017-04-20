/*
 *  Lambda Function: EventsByDay
 *  Developer: Matt Benavente
 *  API: Bailando Events 
 *  Resource/Method: /eventsbyday/GET
 * 
 *  Description: This is the AWS Lambda function used to act as the DB Client to query to the DynamoDB table 
 *  for the value entered in the search bar. (On the bottom, commented out is the test event)
 *      1. It recieves the the field value from the client entry (search)
 *      2. It queries DynamoDB for the record with that Global Secondary Index value
 *
 */

console.log('Starting Lambda Function');
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    var params = {
        ExpressionAttributeValues: {
            ":v1": {
            S: event.params.querystring.DAY_OF_WEEK
            }
        }, 
        KeyConditionExpression: "DAY_OF_WEEK = :v1", 
        TableName: "EVENTS",
        IndexName: "DAY_OF_WEEK-index"
    };

    dynamodb.query(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else{
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            callback(null, JSON.parse( JSON.stringify(data, null, 2)));
        }
    }); 
};

/* 
 *  Testing: API Call
 * 
 *  Use Postman or API Gateway after deploying the API
 *  API Call Example: https://ifjg2idqa4.execute-api.us-west-2.amazonaws.com/Test/eventsbyday?DAY_OF_WEEK=Thursday
 * 
 */

/*  Testing: Lambda Function - Test Event
{
  "body-json": {},
  "params": {
    "path": {},
    "querystring": {
      "DAY_OF_WEEK": "Thursday"
    }
  }
} 
*/