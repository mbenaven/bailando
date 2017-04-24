/*
 *  Developer: Matt Benavente
 * 
 *  Description: This function lists all the records in the table using a table scan
 * 
 */

'use strict';

var AWS = require('aws-sdk');
var db = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: "LD_RSVP"
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
