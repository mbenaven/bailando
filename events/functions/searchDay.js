'use strict';

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

module.exports.byday = (event, context, callback) => {
    console.log("Path Param: " + event.pathParameters.day);
    //console.log("stringify: " + JSON.stringify.pathParameters.day); 
    //console.log("Parse: " + JSON.parse(event.pathParameters.day); 
    //console.log("Parse + Stringify: " + JSON.parse( JSON.stringify)); */
    
    //var DAY_OF_WEEK = JSON.parse(event.pathParameters.day);
    //console.log(typeof(event.pathparameters.day));

    const params = {
        TableName: "LD_EVENTS",
        IndexName: "DAY_OF_WEEK-index",
        ExpressionAttributeValues: {
            ":v1": { S: event.pathParameters.day }
        }, 
        KeyConditionExpression: "DAY_OF_WEEK = :v1" 
    };
    /*
    console.log("Params: " + params);
    db.query(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else{
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            callback(null, JSON.parse( JSON.stringify(data, null, 2)));
        }
    }); */ 
    db.query(params, (error, result) => {
        if (error) console.log(error, error.stack); 
        else{
            console.log("GetItem succeeded:", JSON.stringify(result, null, 2));
            callback(null, JSON.parse( JSON.stringify(result, null, 2)));
        }
    }); 

};