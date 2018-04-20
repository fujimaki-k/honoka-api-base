/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Initialize
const karmia_jsonrpc = require('karmia-lambda-jsonrpc');
const jsonrpc = karmia_jsonrpc();
jsonrpc.set('service', require('./lib/service'));
jsonrpc.methods.set(require('./lib/method'));


// Export hander
exports.handler = async (event, context) => {
    try {
        return jsonrpc.call(event, context, event.body);
    } catch (error) {
        return Promise.reject({
            jsonrpc: "2.0",
            error: {
                code: -32603,
                message: "Internal error",
                data: error
            },
            id: event.body.id
        });
    }
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */

