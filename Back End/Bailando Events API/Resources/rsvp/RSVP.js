/*
 *  Lambda Function: RSVP
 *  Developer: Matt Benavente
 *  API: Bailando Events 
 *  Resource/Method: /rsvp/POST
 * 
 *  Description: It takes the input passed by the POST request and adds it as a new record to the dynamoDB RSVP table.  
 *  It also sends an email using SES (Simple Email Service) to the Email passed by the POST request. 
 *
 */

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();
var ses = new AWS.SES({
   region: 'us-west-2'
});
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    console.log("Email Param :"+event.params.querystring.emailQS);
    console.log("Event Param :"+event.params.querystring.eventidQS);

    var emailString = event.params.querystring.emailQS;

    function ValidateEmail(x){  
 	    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(x)){ 
  	        return (true) 
        } else {return (false)}
    } 
  
    if(ValidateEmail(emailString) === true){
		console.log("Email is valid: " + emailString);
    
        // These parameters (params) are used for to add the record to the DynamoDB RSVP table ( dyanmoDB.putItem() )
        var params = {
            Item: {
                "EMAIL": {
                    S: event.params.querystring.emailQS
                }, 
                "EVENT_ID": {
                    N: event.params.querystring.eventidQS
                }
            }, 
            ReturnConsumedCapacity: "TOTAL", 
            TableName: "RSVP"
        };
    
        //These parameters (eParams) are for the confirmation email being sent to the person who is RSVPing
        var eParams = {
                Destination: {
                    ToAddresses: [event.params.querystring.emailQS]
                },
                Message: {
                    Body: {
                        Text: {
                            Data: "This email is confirm your RSVP to the following event id: " + JSON.stringify(event.params.querystring.eventidQS)
                        }
                    },
                    Subject: {
                        Data: "Bailando RSVP Confirmation"
                    }
                },
                Source: "mbenavente77@gmail.com"
            };
            
            // Uses the parameters (eParams) and the Simple Email Service (SES) to send a confirmation email
            console.log('---SENDING EMAIL---');
            var email = ses.sendEmail(eParams, function(err, data){
                if(err) console.log(err);
                else {
                    console.log("---EMAIL SENT---");
                    console.log(data);
                    console.log("EMAIL CODE END");
                    console.log('EMAIL: ', email);
                    context.succeed(event);
                }
            });

        // Adds an item to DyanmoDB. The table name and field values are specified in the above params.
        dynamodb.putItem(params, function(err,data) {
            if (err){
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                //console.log("putItem succeeded:", JSON.stringify(data, null, 2));
                callback(null, JSON.parse( JSON.stringify(data, null, 2)));
            }
        });
        
    }
    else {
	    console.log("!!!INVALID EMAIL!!!: " + emailString);
    }
};


/* 
 *  Testing: API Call
 * 
 *  Use Postman or API Gateway after deploying the API
 *  API Call Example: https://ifjg2idqa4.execute-api.us-west-2.amazonaws.com/Test/rsvp?emailQS=mbenavente77@gmail.com&eventidQS=2
 * 
 */

/*  Testing: Lambda Function - Test Event
{
  "body-json": {},
  "params": {
    "path": {},
    "querystring": {
        "emailQS": "mbenavente77@gmail.com",
        "eventidQS": "101"
    }
  }
}
*/