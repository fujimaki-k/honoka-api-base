/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Export module
module.exports = {
    Type: 'AWS::ApiGateway::Deployment',
    Properties: {
        Description: 'Initial deployment',
        RestApiId: {Ref: 'RestApi'},
        StageDescription: {
            Description: 'Testing environment'
        },
        StageName: 'testing'
    },
    DependsOn: ['MethodTest']
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

