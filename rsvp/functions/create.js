'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body); //Extract text provided in request event body of JSON format
    
     var emailString = data.EMAIL;

    //  This function uses a regular expression to test the input and return weather the input (email) is in the following format: alphanumeric + @ + alphanumeric + . + alphanumeric
    function ValidateEmail(x){  
 	    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x)){ 
  	        return (true) 
        } else {return (false)}
    } 
  
    if(ValidateEmail(emailString) === true){
		console.log("Email is valid: " + emailString);

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
    } else {
	    console.log("!!!INVALID EMAIL!!!: " + emailString);
    }
}