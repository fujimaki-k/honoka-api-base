/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Export module
module.exports = {
    Type: 'AWS::CloudFront::Distribution',
    Properties: {
        DistributionConfig: {
            Comment: "honoka.io no-cache distribution",
            DefaultCacheBehavior: {
                AllowedMethods: [
                    'DELETE',
                    'GET',
                    'HEAD',
                    'OPTIONS',
                    'PATCH',
                    'POST',
                    'PUT'
                ],
                CachedMethods: [
                    'GET',
                    'HEAD',
                    'OPTIONS'
                ],
                Compress: true,
                DefaultTTL: 0,
                ForwardedValues: {
                    Cookies: {
                        Forward: 'all'
                    },
                    Headers: [
                        'Access-Control-Request-Headers',
                        'Access-Control-Request-Method',
                        'Origin'
                    ],
                    QueryString: true
                },
                MaxTTL: 0,
                MinTTL: 0,
                TargetOriginId: {Ref: 'BucketClient'},
                ViewerProtocolPolicy: 'redirect-to-https'
            },
            DefaultRootObject: 'index.html',
            Enabled: true,
            HttpVersion: 'http2',
            Logging: {
                Bucket: {'Fn::Sub': '${BucketLogs}.s3.amazonaws.com'},
                IncludeCookies: false,
                Prefix: 'cloudfront'
            },
            Origins: [{
                DomainName: {'Fn::Sub': '${BucketClient}.s3.amazonaws.com'},
                Id: {Ref: 'BucketClient'},
                S3OriginConfig: {}
            }],
            PriceClass: 'PriceClass_200'
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

