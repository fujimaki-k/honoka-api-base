/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Export module
module.exports = {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
        AttributeDefinitions: [{
            AttributeName: 'user_id',
            AttributeType: 'S'
        }, {
            AttributeName: 'document_id',
            AttributeType: 'S'
        }, {
            AttributeName: 'title',
            AttributeType: 'S'
        }, {
            AttributeName: 'created_at',
            AttributeType: 'S'
        }, {
            AttributeName: 'updated_at',
            AttributeType: 'S'
        }, {
            AttributeName: 'archive',
            AttributeType: 'N'
        }],
        KeySchema: [{
            AttributeName: 'user_id',
            KeyType: 'HASH'
        }, {
            AttributeName: 'document_id',
            KeyType: 'RANGE'
        }],
        LocalSecondaryIndexes: [{
            IndexName: 'index_user_title',
            KeySchema: [{
                AttributeName: 'user_id',
                KeyType: 'HASH'
            }, {
                AttributeName: 'title',
                KeyType: 'RANGE'
            }],
            Projection: {
                ProjectionType: 'ALL'
            }
        }, {
            IndexName: 'index_user_archive',
            KeySchema: [{
                AttributeName: 'user_id',
                KeyType: 'HASH'
            }, {
                AttributeName: 'archive',
                KeyType: 'RANGE'
            }],
            Projection: {
                ProjectionType: 'ALL'
            }
        }, {
            IndexName: 'index_user_created_at',
            KeySchema: [{
                AttributeName: 'user_id',
                KeyType: 'HASH'
            }, {
                AttributeName: 'created_at',
                KeyType: 'RANGE'
            }],
            Projection: {
                ProjectionType: 'ALL'
            }
        }, {
            IndexName: 'index_user_updated_at',
            KeySchema: [{
                AttributeName: 'user_id',
                KeyType: 'HASH'
            }, {
                AttributeName: 'updated_at',
                KeyType: 'RANGE'
            }],
            Projection: {
                ProjectionType: 'ALL'
            }
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        },
        TableName: 'documents'
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

