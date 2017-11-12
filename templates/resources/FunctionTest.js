/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Export module
module.exports = {
    Type: 'AWS::Lambda::Function',
    Properties: {
        Code: './dest/test',
        Description: 'Test function',
        FunctionName: 'hello',
        Handler: 'index.handler',
        Role: {
            'Fn::GetAtt': [
                'RoleLambda',
                'Arn'
            ]
        },
        Runtime: 'nodejs6.10'
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

