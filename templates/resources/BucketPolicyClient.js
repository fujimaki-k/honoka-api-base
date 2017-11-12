/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Export module
module.exports = {
    Type: 'AWS::S3::BucketPolicy',
    Properties: {
        Bucket: {Ref: 'BucketClient'},
        PolicyDocument: {
            Statement: [{
                Action: ['s3:GetObject'],
                Effect: 'Allow',
                Resource: [{'Fn::Sub': 'arn:aws:s3:::${BucketClient}/*'}],
                Principal: '*',
                Condition: {
                    IpAddress: {
                        'aws:SourceIp': [
                            '0.0.0.0/1',
                            '128.0.0.0/1'
                        ]
                    }
                }
            }]
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

