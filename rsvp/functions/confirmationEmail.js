/*
 *  Developer: Matt Benavente
 * 
 * 
 *  Description: This Lambda function sends an email containing the item information when an item is inserted 
 *  into the RSVP dynamo DB Table. It is triggered by the event stream associated with the LD_RSVP  DynamoDB table. 
 *  
 *  When an item is Inserted into the LD_RSVP table
 *  a event of eventName = 'INSERT' is added to the event stream.  
 *  This function sends an email containing the EVENT_ID and RSVP_ID
 * 
 */

'use strict';
var AWS = require("aws-sdk");
var db = new AWS.DynamoDB();
var ses = new AWS.SES({
   region: 'us-west-2'
});

module.exports.insert = (event, context, callback) => {

    event.Records.forEach((record) => {
        console.log('Stream record: ', JSON.stringify(record, null, 2));
        
        if (record.eventName == 'INSERT') {
            var rsvpID = JSON.stringify(record.dynamodb.NewImage.RSVP_ID.S);
            var eventID = JSON.stringify(record.dynamodb.NewImage.EVENT_ID.S);
            var email = record.dynamodb.NewImage.EMAIL.S;
            console.log(email);
            
            //These parameters (eParams) are for the confirmation email being sent to the person who is RSVPing
            var eParams = {
                Destination: {
                    ToAddresses: [record.dynamodb.NewImage.EMAIL.S]
                },
                Message: {
                    Body: {
                        Text: {
                            Data: "You are confirmed to attend the following Bailando event! EVENT ID: " + eventID + ", RSVP Confirmation Number: " + rsvpID 
                        }
                    },
                    Subject: {
                        Data: "Bailando Events - RSVP Confirmation"
                    }
                },
                Source: "mbenavente77@gmail.com"
            };
        
            console.log('---SENDING EMAIL---');
            var email = ses.sendEmail(eParams, (err, data) => {
                if(err) console.log(err);
                else {
                    console.log("---EMAIL SENT---");
                    console.log(data);
                    console.log('EMAIL: ', email);
                    context.succeed(event);
                }
            });
        }
    });
    callback(null, `Successfully processed ${event.Records.length} records.`);
};


