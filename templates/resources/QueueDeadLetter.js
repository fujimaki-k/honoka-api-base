/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



module.exports = {
    Type: 'AWS::SQS::Queue',
    Properties: {
        MessageRetentionPeriod: 60 * 60 * 24 * 14,
        QueueName: 'honoka-DeadLetter',
        VisibilityTimeout: 30
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

