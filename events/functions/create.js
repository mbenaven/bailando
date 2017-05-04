'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body); //Extract text provided in request event body of JSON format

    if(typeof data.DAY_OF_WEEK !== 'string'){
        console.error("Validation Failed, not string")
    }

    const params = {
        TableName: 'LD_EVENTS',
        Item: {
            EVENT_ID: uuid.v1(),
            DAY_OF_WEEK: data.DAY_OF_WEEK,
            VENUE: data.VENUE + ": Modified",
            LAST_UPDATED_TS: timestamp,
            CHECKED: false
        }
    }

    dynamoDb.put(params, (error, results) => {
        if(error){
            console.error(eror);
            callback(new Error('Could not create the new event.'));
            return;
        }
    
        const response = {
            statusCode: 200,
            body: JSON.stringify(results.Item)
        }
        callback(null, response);
    })
}