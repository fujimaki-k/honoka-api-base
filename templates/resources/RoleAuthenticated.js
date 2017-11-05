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
                    Federated: ['cognito-identity.amazonaws.com']
                },
                Action: ['sts:AssumeRoleWithWebIdentity'],
                Condition: {
                    StringEquals: {
                        'cognito-identity.amazonaws.com:aud': {Ref: 'IdentityPool'}
                    },
                    'ForAnyValue:StringLike': {
                        'cognito-identity.amazonaws.com:amr': 'authenticated'
                    }
                }
            }]
        },
        ManagedPolicyArns: ['arn:aws:iam::aws:policy/AmazonMobileAnalyticsWriteOnlyAccess'],
        Policies: [{
            PolicyName: 'authenticated.cognito.honoka.io',
            PolicyDocument: {
                Version: '2012-10-17',
                Statement: [{
                    Effect: 'Allow',
                    Action: [
                        'cognito-sync:*',
                        'cognito-identity:*'
                    ],
                    Resource: [{
                        'Fn::Join': ['/', [
                            {'Fn::Sub': 'arn:aws:cognito-identity:${AWS::Region}:${AWS::AccountId}:identitypool'},
                            {Ref: 'IdentityPool'}
                        ]]
                    }]
                }, {
                    Effect: 'Allow',
                    Action: ['execute-api:Invoke'],
                    Resource: ['*']
                }]
            }
        }],
        RoleName: 'authenticated.cognito.honoka.io'
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

