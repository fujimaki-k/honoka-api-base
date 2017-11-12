/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Export module
module.exports = {
    Type: 'AWS::Lambda::Permission',
    Properties: {
        FunctionName: {
            'Fn::GetAtt': [
                'FunctionTest',
                'Arn'
            ]
        },
        Action: 'lambda:InvokeFunction',
        Principal: 'events.amazonaws.com',
        SourceArn: {
            'Fn::GetAtt': [
                'Events',
                'Arn'
            ]
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

