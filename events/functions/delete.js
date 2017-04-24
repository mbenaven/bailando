/*
 *  Developer: Matt Benavente
 * 
 *  Description: This is the AWS Lambda function used to act as the DB Client to delete the records 
 *  with the corresponsing EVENT_ID from the LD_EVENTS DynamoDB table.
 * 
 */

'use strict';

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
    const params = {
        TableName: "LD_EVENTS",
        Key: {
            EVENT_ID: event.pathParameters.id
        }
    };
    
    db.delete(params, (error) => {
        if (error){
            console.error(error);
            callback(new Error('Couldn\'t delete the event.'));
            return;
        } 

        const response = {
            statusCode: 200,
            body: JSON.stringify({})
        };
        callback(null, response);
    });
};

