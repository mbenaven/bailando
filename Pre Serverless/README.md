# Bailando - Latin Dance Event Application
    1. Live URL: http://bailando.com.s3-website-us-west-2.amazonaws.com/
    2. Inner Source: https://innersource.accenture.com/projects/SERMPB/repos/store-api/
    3. Developer: Matt Benavente 
    4. Release: v1.2

# High Level Application Description
Latin dance event applicaiton, allowing users to search weekly events and rsvp to them.

# Application Architecture
Uses Amazon's "Serverless" Architecture (Node,js, DynamoDB, AWS Lambda, S3, API Gateway)

# Features
    1. Search events in DynamoDB table by their primary key, using the web application to invoke a lambda function.
    2. RSVP to events though POST API calls **Web application client integration in scope of next release**
        a. Invalid emails submitted will not be added to the RSVP table
        b. It will write to the CloudWatch Log that the RSVP email is Invalid
    3. Attendees who RSVP will recieve a confirmation email.
    4. Search events in DynamoDB by their global secondary index (GSI) value, Day of Week, through GET API Calls **Web application client integration in scope of next release**
    5. When a new record is added to the EVENTS table, the developer will recieve an email

# Directory Structure
    1. Lambda Function JavaScript files are stored in the Back End folder, under their API and resource and method names corresponding to how they are invoked from the API Gateway. (ie. Back End\Bailando Events API\Resources\rsvp\rsvp.js)
    2. The Front End folder contains the html and css files for the UI. It also contains AWS JavaScript SDK within the Lib folder in addition to the apigClient.js file, which allow the web application to act as client to the API Gateway API and make API Requests such as GET, POST, etc.  The clientRequests folder contains the API calls that interact with apigClient and API Gateway.


