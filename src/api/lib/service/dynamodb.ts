/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Export module
export = {
    /**
     * Generate DocumentClient.update() parameter.
     *
     * @param {Object} parameters
     * @param {Array<string> | string | {Object}} [keys = {}]
     * @param {Object} [options = {}]
     * @returns {Object}
     */
    buildUpdateParameter(parameters: {[index: string]: any}, keys: Array<string>|string|{}={}, options={}) {
        keys = (typeof keys === "string") ? [keys] : keys;
        if (Array.isArray(keys)) {
            keys = keys.reduce((collection: {[index: string]: any}, key: string) => {
                if (key in parameters) {
                    collection[key] = parameters[key];
                }

                return collection;
            }, {});
        }

        const result = Object.keys(parameters).reduce((collection: {[index: string]: any}, key: string) => {
            if (key in collection.Key) {
                return collection;
            }

            collection.ExpressionAttributeNames[`#${key}`] = key;
            collection.ExpressionAttributeValues[`:${key}`] = parameters[key];
            collection.UpdateExpression.push(`#${key} = :${key}`);

            return collection;
        }, {
            Key: keys,
            ExpressionAttributeNames: {},
            ExpressionAttributeValues: {},
            UpdateExpression: []
        });
        result.UpdateExpression = `SET ${result.UpdateExpression.join(", ")}`;

        return Object.assign(result, options);
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
 
