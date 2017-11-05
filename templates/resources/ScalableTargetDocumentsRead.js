/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Export module
module.exports = {
    Type: 'AWS::ApplicationAutoScaling::ScalableTarget',
    Properties: {
        MaxCapacity: 10,
        MinCapacity: 1,
        ResourceId: {
            'Fn::Join': ['/', [
                'table',
                {Ref: 'TableDocuments'}
            ]]
        },
        RoleARN: {
            'Fn::GetAtt': ['RoleAutoscaling', 'Arn']
        },
        ScalableDimension: 'dynamodb:table:ReadCapacityUnits',
        ServiceNamespace: 'dynamodb'
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

