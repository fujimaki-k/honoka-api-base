/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Export module
module.exports = {
    Type: 'AWS::IAM::Role',
    Properties: {
        AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: [{
                Effect: 'Allow',
                Principal: {
                    Service: ['application-autoscaling.amazonaws.com']
                },
                Action: ['sts:AssumeRole']
            }]
        },
        Policies: [{
            PolicyName: 'autoscaling.dynamodb.honoka.io',
            PolicyDocument: {
                Version: '2012-10-17',
                Statement: [{
                    Effect: 'Allow',
                    Action: [
                        'dynamodb:DescribeTable',
                        'dynamodb:UpdateTable'
                    ],
                    Resource: ['*']
                }, {
                    Effect: 'Allow',
                    Action: [
                        'cloudwatch:PutMetricAlarm',
                        'cloudwatch:DescribeAlarms',
                        'cloudwatch:GetMetricStatistics',
                        'cloudwatch:SetAlarmState',
                        'cloudwatch:DeleteAlarms'
                    ],
                    Resource: ['*']
                }]
            }
        }],
        RoleName: 'autoscaling.dynamodb.honoka.io'
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

