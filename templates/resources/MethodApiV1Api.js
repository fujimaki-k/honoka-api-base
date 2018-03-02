/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";


// Import modules
const fs = require('fs'),
    path = require('path');

// Export module
module.exports = {
    Type: 'AWS::ApiGateway::Method',
    Properties: {
        AuthorizationType: 'NONE',
        HttpMethod: 'POST',
        Integration: {
            Type: 'AWS',
            IntegrationHttpMethod: 'POST',
            Uri: {
                'Fn::Join': ['/', [
                    {'Fn::Sub': 'arn:aws:apigateway:${AWS::Region}:lambda:path'},
                    '2015-03-31',
                    'functions',
                    {'Fn::GetAtt': ['FunctionApi', 'Arn']},
                    'invocations'
                ]]
            },
            IntegrationResponses: [{
                StatusCode: 200,
                ResponseTemplates: {
                    'application/json': fs.readFileSync(path.resolve(__dirname, '../mapping/response')).toString('UTF-8')
                }
            }],
            RequestTemplates: {
                'application/json': fs.readFileSync(path.resolve(__dirname, '../mapping/request')).toString('UTF-8')
            }
        },
        MethodResponses: [{
            StatusCode: 200
        }],
        ResourceId: {Ref: 'ResourceApiV1Api'},
        RestApiId: {Ref: 'RestApi'}
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

