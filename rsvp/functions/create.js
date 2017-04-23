'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body); //Extract text provided in request event body of JSON format

    const params = {
        TableName: 'LD_RSVP',
        Item: {
            RSVP_ID: uuid.v1(),
            EVENT_ID: data.EVENT_ID,
            EMAIL: data.EMAIL,
            RSVP_TS: timestamp
        }
    }

    dynamoDb.put(params, (error, results) => {
        if(error){
            console.error(eror);
            callback(new Error('Could not add item to RSVP table.'));
            return;
        }
    
        const response = {
            statusCode: 200,
            body: JSON.stringify(results.Item)
        }
        callback(null, response);
    })
}