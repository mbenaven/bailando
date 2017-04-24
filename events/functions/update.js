/*
 *  Developer: Matt Benavente
 * 
 */

'use strict';

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    if(typeof data.CHECKED !== 'boolean' || typeof data.DAY_OF_WEEK !== 'string'){
        console.error('Validation Error, Input Data Type');
        callback(new Error('Couldn\'t update the event item.'));
        return;
    }

    const params = {
        TableName: "LD_EVENTS",
        Item: {
            EVENT_ID: event.pathParameters.id,
            DAY_OF_WEEK: data.DAY_OF_WEEK,
            VENUE: data.VENUE,
            CHECKED: data.CHECKED,
            LAST_UPDATED_TS: timestamp
        }
    }
    
    db.put(params, (error, result) => {
        if (error){
            console.error(error);
            callback(new Error('Couldn\'t  update the event.'));
            return;
        } 

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        }
        callback(null, response);
    });
};

