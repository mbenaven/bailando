'use strict';

module.exports.hello = (event, context, callback) => {
  
  console.log(process.env.foo);
  //console.log(process.env.fooTwo);
  //console.log(process.env.fooThree);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'This Funciton has been updated AGAIN :)',
      //input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};


//The parameters from AWS Lambda are passed in here, but this constructs a response and returns.
module.exports.imageResize = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Resized your image!',
      //input: event,
    }),
  };

  callback(null, response);
};