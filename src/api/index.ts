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


// Declarations
declare interface Parameters {
    [index: string]: any;
}

/**
 * Load config parameters
 *
 * @param {string} stage
 * @param {object} [default_parameters = {}]
 */
const load_config = (stage: string, default_parameters={}) => {
    try {
      const   stage_config = require(path.resolve(__dirname, 'config', stage));

      return utility.object.mergeProperties(default_parameters, stage_config);
    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
            return default_parameters;
        }

        throw error;
    }
};


// Variables
const default_config = require(path.resolve(__dirname, "./config/default"));
const jsonrpc = new KarmiaLambdaJSONRPC();
const utility = new KarmiaUtility();
jsonrpc.set('utility', utility);
jsonrpc.set('service', Services);
jsonrpc.methods.set(Methods);


// Export hander
exports.handler = async (event: Parameters, context: Parameters): Promise<any> => {
    try {
        const config = load_config(event.stage, default_config);
        config.aws = config.aws || {};
        config.aws.global = config.aws.global || {};
        config.aws.global.region = config.aws.global.region || 'ap-northeast-1';

        AWS.config.update(config.aws.global);
        jsonrpc.set('aws', AWS);
        jsonrpc.set('config', config);

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

