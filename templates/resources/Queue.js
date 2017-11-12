/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



module.exports = {
    Type: 'AWS::SQS::Queue',
    Properties: {
        MessageRetentionPeriod: 60 * 60 * 24 * 10,
        QueueName: 'honoka',
        RedrivePolicy: {
            deadLetterTargetArn: {
                'Fn::GetAtt': [
                    'QueueDeadLetter',
                    'Arn'
                ]
            },
            maxReceiveCount: 5
        },
        VisibilityTimeout: 60 * 5
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

