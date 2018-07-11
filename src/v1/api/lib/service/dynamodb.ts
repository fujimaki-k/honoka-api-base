/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Declaration
declare interface Keys {
    [index: string]: any
}

declare interface Options {
    [index: string]: any
}

declare interface Expression {
    TableName?: string,
    Key?: {[index: string]: any},
    ExpressionAttributeNames: {[index: string]: string},
    ExpressionAttributeValues: {[index: string]: any},
    Expression: Array<string>|string
}


class DynamoDB {
    /**
     * Build key parameter
     *
     * @param {Object} parameters
     * @param {Array|string|Object} keys
     * @returns {Object}
     */
    static keys (parameters: {[index: string]: any}, keys: Array<string>|string|Keys): Keys {
        keys = (typeof keys === "string") ? [keys] : keys;
        if (Array.isArray(keys)) {
            return keys.reduce((collection: {[index: string]: any}, key: string) => {
                if (key in parameters) {
                    collection[key] = parameters[key];
                }

                return collection;
            }, {});
        }

        return keys;
    }

    /**
     * Build expression
     *
     * @param {Object} parameters
     * @param {Array|Object} excludes
     * @returns {Object}
     */
    static expression (parameters: {[index: string]: any}|Keys, excludes: Array<string>|Keys): Expression {
        const keys = Array.isArray(excludes) ? excludes.reduce((collection: {[index: string]: number}, key: string) => {
            collection[key] = 1;

            return collection;
        }, {}) : excludes;

        const result = Object.keys(parameters).reduce((collection: Expression, key: string) => {
            if (key in keys) {
                return collection;
            }

            collection.ExpressionAttributeNames[`#${key}`] = key;
            collection.ExpressionAttributeValues[`:${key}`] = parameters[key];
            (collection.Expression as Array<string>).push(`#${key} = :${key}`);

            return collection;
        }, {
            ExpressionAttributeNames: {},
            ExpressionAttributeValues: {},
            Expression: []
        });
        result.Expression = `${(result.Expression as Array<string>).join(", ")}`;

        return result;
    }

    /**
     * Generate DocumentClient.query() parameter
     *
     * @param {Object} keys
     * @param {Options} [options = {}]
     * @returns {Object}
     */
    static buildQueryParameter(keys: Keys={}, options: Options={}) {
        const expression = DynamoDB.expression(keys, {});

        return Object.assign({
            TableName: options.TableName || "",
            ExpressionAttributeNames: expression.ExpressionAttributeNames,
            ExpressionAttributeValues: expression.ExpressionAttributeValues,
            KeyConditionExpression: expression.Expression as string
        }, options);
    }

    /**
     * Generate DocumentClient.update() parameter
     *
     * @param {Object} parameters
     * @param {Array|string|Object} [keys = {}]
     * @param {Object} [options = {}]
     * @returns {Object}
     */
    static buildUpdateParameter(parameters: {[index: string]: any}, keys: Array<string>|string|{}={}, options: Options={}) {
        const key = DynamoDB.keys(parameters, keys);
        const expression = DynamoDB.expression(parameters, key);

        return Object.assign({
            TableName: options.TableName || "",
            Key: key,
            ExpressionAttributeNames: expression.ExpressionAttributeNames,
            ExpressionAttributeValues: expression.ExpressionAttributeValues,
            UpdateExpression: `SET ${expression.Expression}`
        }, options);
    }
}


// Export module
export = DynamoDB;



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
