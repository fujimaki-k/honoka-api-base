/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Export module
module.exports = {
    Type: 'AWS::Lambda::Permission',
    Properties: {
        Action: 'lambda:invokeFunction',
        FunctionName: {'Fn::GetAtt': ['FunctionApi', 'Arn']},
        Principal: 'apigateway.amazonaws.com',
        SourceArn: {
            'Fn::Sub': 'arn:aws:execute-api:${AWS::Region}:${AWS::AccountId}:${RestApi}/*'
        }
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

