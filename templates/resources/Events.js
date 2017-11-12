/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Export module
module.exports = {
    Type: 'AWS::Events::Rule',
    Properties: {
        Description: 'honoka.io scheduled event',
        Name: 'scheduled.event.honoka.io',
        ScheduleExpression: 'cron(* * * * ? *)',
        State: 'DISABLED',
        Targets: [{
            Arn: {
                'Fn::GetAtt': [
                    'FunctionTest',
                    'Arn'
                ]
            },
            Id: 'hello.function.honoka.io',
            Input: '{}',
            
        }]
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

