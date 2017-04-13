var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    // TODO implement - It expects a request containing a the EVENT_ID
    console.log("PARAMS---:"+parseInt(event.params.querystring.EVENT_ID));
    var params = {
            TableName: "EVENTS",
            Key:{
                "EVENT_ID": parseInt(event.params.querystring.EVENT_ID)
            }
    };
    
    //This gets the item from DyanmoDB with the table specified in the Params, and the value specified in the request
    docClient.get(params, function(err,data) {
        if (err){
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            //console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            callback(null, JSON.parse( JSON.stringify(data, null, 2)));
        }
    });
};


/* Test event
{
	"body-json":{},
	"params": {
		"path": {},
		"querystring": {
			"EVENT_ID": "1"
		}
	}
}	
*/