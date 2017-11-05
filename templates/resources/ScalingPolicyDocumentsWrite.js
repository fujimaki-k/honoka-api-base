/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Export module
module.exports = {
    Type: 'AWS::ApplicationAutoScaling::ScalingPolicy',
    Properties: {
        PolicyName: 'write.scaling-policy.documents.honoka.io',
        PolicyType: 'TargetTrackingScaling',
        ScalingTargetId: {Ref: 'ScalableTargetDocumentsWrite'},
        TargetTrackingScalingPolicyConfiguration: {
            TargetValue: 80.0,
            ScaleInCooldown: 60,
            ScaleOutCooldown: 60,
            PredefinedMetricSpecification: {
                PredefinedMetricType: 'DynamoDBWriteCapacityUtilization'
            }
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
