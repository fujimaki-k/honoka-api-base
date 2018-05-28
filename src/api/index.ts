/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import module
import path = require("path");
import AWS = require("aws-sdk");
import KarmiaLambdaJSONRPC = require("karmia-lambda-jsonrpc");
import KarmiaUtility = require("karmia-utility");
import Services = require("./lib/service");
import Methods = require("./lib/method");


// Variables
const default_config: {[index: string]: any} = require(path.resolve(__dirname, "./config/default"));
const jsonrpc = new KarmiaLambdaJSONRPC();
const utility = new KarmiaUtility();
jsonrpc.set('service', Services);
jsonrpc.methods.set(Methods);
jsonrpc.set('utility', utility);


// Declarations
declare interface Parameters {
    [index: string]: any;
}


// Export hander
exports.handler = async (event: Parameters, context: Parameters): Promise<any> => {
    try {
        const stage_config = require(path.resolve(__dirname, `./config/${event.stage}`));
        const config = utility.object.mergeProperties(default_config, stage_config);
        config.aws = config.aws || {};
        config.aws.global = config.aws.global || {};
        config.aws.global.region = config.aws.global.region || 'ap-northeast-1';

        AWS.config.update(config.aws.global);
        jsonrpc.set('config', config);
        jsonrpc.set('aws', AWS);

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

