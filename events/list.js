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

var AWS = require('aws-sdk');
var db = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: "LD_EVENTS"
};

module.exports.list = (event, context, callback) => {
    db.scan(params, (error, result) => {
        if (error){
            console.error("Unable to read item. Error: " + error);
            callback(new Error('Couldn\'t fetch the events.'));
            return;
        } 

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        };
        callback(null, response);
    });
}
