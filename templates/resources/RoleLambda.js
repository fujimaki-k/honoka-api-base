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
                    Service: ['lambda.amazonaws.com']
                },
                Action: 'sts:AssumeRole'
            }]
        },
        Policies: [{
            PolicyName: 'lambda.honoka.io',
            PolicyDocument: {
                Version: '2012-10-17',
                Statement: [{
                    Effect: 'Allow',
                    Action: [
                        'logs:CreateLogGroup',
                        'logs:CreateLogStream',
                        'logs:PutLogEvents'
                    ],
                    Resource: ['arn:aws:logs:*:*:*']
                }, {
                    Effect: 'Allow',
                    Action: [
                        'dynamodb:DeleteItem',
                        'dynamodb:GetItem',
                        'dynamodb:PutItem',
                        'dynamodb:Query',
                        'dynamodb:Scan',
                        'dynamodb:UpdateItem'
                    ],
                    Resource: [{
                        'Fn::Sub': 'arn:aws:dynamodb:${AWS::Region}:${AWS::AccountId}:table/*'
                    }]
                }, {
                    Effect: 'Allow',
                    Action: [
                        's3:DeleteObject',
                        's3:GetBucketLocation',
                        's3:GetObject',
                        's3:ListBucket',
                        's3:ListAllMyBuckets',
                        's3:PutObject'
                    ],
                    Resource: [{
                        'Fn::Join': ['', [
                            'arn:aws:s3:::',
                            {Ref: 'Bucket'}
                        ]]
                    }, {
                        'Fn::Join': ['', [
                            'arn:aws:s3:::',
                            {Ref: 'Bucket'},
                            '/*'
                        ]]
                    }]
                }]
            }
        }],
        RoleName: 'lambda.honoka.io'
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

