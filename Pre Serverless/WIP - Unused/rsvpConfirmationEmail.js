var aws = require('aws-sdk');
var ses = new aws.SES({
   region: 'us-west-2'
});

exports.handler = function(event, context, callback) {
    console.log("Incoming: ", event);
   // var output = querystring.parse(event);
    
    event.Records.forEach(function(record) {
        if (record.eventName == "INSERT") { 
    
            var params = {
                Destination: {
                    ToAddresses: [event.params.querystring.emailQS]
                },
                Message: {
                    Body: {
                        Text: {
                            Data: "This email is confirm your RSVP to the following event: "
                        }
                    },
                    Subject: {
                        Data: "Bailando RSVP Confirmation"
                    }
                },
                Source: "mbenavente77@gmail.com"
            };
        
            console.log('===SENDING EMAIL===');
            var email = ses.sendEmail(params, function(err, data){
                if(err) console.log(err);
                else {
                    console.log("===EMAIL SENT===");
                    console.log(data);

                    console.log("EMAIL CODE END");
                    console.log('EMAIL: ', email);
                    context.succeed(event);
                }
            });
        }
        callback(null, {});
    });
}