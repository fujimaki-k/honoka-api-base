/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Export module
module.exports = {
    Type: 'AWS::ApiGateway::Method',
    Properties: {
        AuthorizationType: 'NONE',
        HttpMethod: 'GET',
        Integration: {
            IntegrationHttpMethod: 'POST',
            IntegrationResponses: [{
                StatusCode: 200,
                ResponseTemplates: {'application/json': ''}
            }],
            Type: 'AWS',
            Uri: {
                'Fn::Join': ['/', [
                    {'Fn::Sub': 'arn:aws:apigateway:${AWS::Region}:lambda:path'},
                    '2015-03-31',
                    'functions',
                    {'Fn::GetAtt': [
                        'FunctionTest',
                        'Arn'
                    ]},
                    'invocations'
                ]]
            }
        },
        MethodResponses: [{
            ResponseModels: {'application/json': 'Empty'},
            StatusCode: 200
        }],
        ResourceId: {Ref: 'ResourceTest'},
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

