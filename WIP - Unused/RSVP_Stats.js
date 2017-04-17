var AWS = require('aws-sdk');

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "EVENTS";

exports.handler = (event, context, callback) => {
    // event comes in is the full DynamoDB record
    // console.log(JSON.stringify(event, null, 2));
    // + Iterate over every record in the batch
    event.Records.forEach(function(record) {
        // this function only operates on new data, not modified data
        // + Filter out all events that aren't INSERT events
        // + Since this function modifies DynamoDB data. If it executed every time there was a modification, it would invoke itself - infinite loop - Because it would recieve events for its own modifications
        if (record.eventName !== "INSERT") { return null; }
        
        //Net Profit
        RSVP_REVENUE = record.dynamodb.NewImage.COVER.N * record.dynamodb.NewImage.RSVP_ATTENDANCE.N;
        RSVP_PERCENTAGE = record.dynamodb.NewImage.RSVP_ATTENDANCE.N / record.dynamodb.NewImage.ATTENDANCE.N;
        
        //Puts back data, but now with a new calculation and timestamp
        docClient.put({
            TableName: table,
            Item: {
                "EVENT_ID": record.dynamodb.Keys.EVENT_ID.N,
                "ATTENDANCE": record.dynamodb.NewImage.ATTENDANCE.N,
                "RSVP_ATTENDANCE": record.dynamodb.NewImage.RSVP_ATTENDANCE.N,
                "COVER": record.dynamodb.NewImage.COVER.N,
                "DAY_OF_WEEK": record.dynamodb.NewImage.DAY_OF_WEEK.S,
                "RSVP_REVENUE": RSVP_REVENUE,
                "RSVP_PERCENTAGE": RSVP_PERCENTAGE,
                "TIMESTAMP": (new Date()).toISOString()
            }
        }, function(err, data) {
            if (err) console.log(err);
            else console.log("DynamoDB write succeeded with: ", data);
        });
    });
    callback(null, {});
};



var AWS = require('aws-sdk');

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "cloudguru-table";

exports.handler = (event, context, callback) => {
    // event comes in is the full DynamoDB record
    console.log(JSON.stringify(event, null, 2));

    event.Records.forEach(function(record) {
        // this function only operates on new data, not modified data
        if (record.eventName !== "INSERT") { return null; }

        net = record.dynamodb.NewImage.gross.N - record.dynamodb.NewImage.costs.N;

        docClient.put({
            TableName: table,
            Item: {
                "txid": record.dynamodb.Keys.txid.S,
                "costs": record.dynamodb.NewImage.costs.N,
                "gross": record.dynamodb.NewImage.gross.N,
                "net": net,
                "timestamp": (new Date()).toISOString(),
            }
        }, function(err, data) {
            if (err) console.log(err);
            else console.log("DynamoDB write succeeded with: ", data);
        });
    });
    callback(null, {});
};
