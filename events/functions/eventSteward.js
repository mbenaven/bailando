/*
 *  Lambda Function: EventSteward
 *  Developer: Matt Benavente
 *  API: Bailando Events 
 *  Resource/Method: N/A
 *  Trigger: DyanamoDB event stream - EVENTS table
 *  Event Source ARN: arn:aws:dynamodb:us-west-2:079985610213:table/EVENTS/stream/2017-04-14T05:23:07.869
 * 
 * 
 *  Description: This Lambda function sends an email containing the item information when an item is inserted 
 *  into the EVENTS dynamo DB Table. It is triggered by the event stream associated with the EVENTS DynamoDB table. 
 *  
 *  Note: All DynamoDB tables have event streams, this table just happens to also be named EVENTS.
 *  Stream events are created when something is Modified, Inserted etc. in the table. 
 *  
 *  When an item is Inserted into the EVENTS table (for dancing EVENTS)
 *  a event of eventName = 'INSERT' is added to the event stream.  
 *  This function sends an email containing the (dancing) EVENT info whenever there is an Insert 
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
            var venue = JSON.stringify(record.dynamodb.NewImage.VENUE.S);
            var day = JSON.stringify(record.dynamodb.NewImage.DAY_OF_WEEK.S);
            var id = JSON.stringify(record.dynamodb.NewImage.EVENT_ID.S);
            
            //These parameters (eParams) are for the confirmation email being sent to the person who is RSVPing
            var eParams = {
                Destination: {
                    ToAddresses: ["mbenavente77@gmail.com"]
                },
                Message: {
                    Body: {
                        Text: {
                            Data: "This email is to notify you that a new record has been inserted into the Event table. EVENT ID: " + id + ", VENUE_NAME: " + venue +  ", DAY_OF_WEEK: " + day 
                        }
                    },
                    Subject: {
                        Data: "Event Table - Update Notification"
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



/* 
 *  Testing - Test Event - Event Stream Simulation
 *  This Event Stream simulates someone adding a record to the EVENTS dynamoDB table.
 * 
{
  "Records": [
    {
      "eventID": "7de3041dd709b024af6f29e4fa13d34c",
      "eventName": "INSERT",
      "eventVersion": "1.1",
      "eventSource": "aws:dynamodb",
      "awsRegion": "us-west-2",
      "dynamodb": {
        "ApproximateCreationDateTime": 1479499740,
        "Keys": {
          "EVENT_ID": {
            "N": "106"
          }
        },
        "NewImage": {
          "COVER": {
            "N": "10"
          },
          "RSVP_ATTENDANCE": {
            "N": "60"
          },
          "ATTENDANCE": {
            "N": "200"
          },
          "EVENT_ID": {
            "N": "106"
          },
          "DAY_OF_WEEK": {
            "S": "Saturday"
          },
          "VENUE_NAME": {
            "S": "Las Fuentes"
          }
        },
        "SequenceNumber": "13021600000000001596893679",
        "SizeBytes": 112,
        "StreamViewType": "NEW_IMAGE"
      },
      "eventSourceARN": "arn:aws:dynamodb:us-west-2:079985610213:table/EVENTS/stream/2017-04-14T05:23:07.869"
    }
  ]
}
*/