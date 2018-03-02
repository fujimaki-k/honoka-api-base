/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Export module
module.exports = {
    Type: 'AWS::ApiGateway::Stage',
    Properties: {
        DeploymentId: {Ref: 'DeploymentTesting'},
        Description: 'Testing stage',
        RestApiId: {Ref: 'RestApi'},
        StageName: 'Testing'
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

