/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Export module
module.exports = {
    Type: 'AWS::SNS::Topic',
    Properties: {
        DisplayName: 'honoka.io',
        Subscription: [{
            Endpoint: {'Fn::Sub': 'arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:hello'},
            /*
            Endpoint: {
                'Fn::GetAtt': [
                    'FunctionTest',
                    'Arn'
                ]
            },
            */
            Protocol: 'lambda'
        }],
        TopicName: 'honoka'
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

