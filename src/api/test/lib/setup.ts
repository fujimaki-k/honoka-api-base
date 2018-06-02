/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules
import fs = require("fs");
import path = require("path");
import AWS = require("aws-sdk");
import LocalStack = require("./localstack");


// Variables
let initialized = false;
const resource_directory = path.resolve(__dirname, "../../../../templates/resources");
const fixture_directory = path.resolve(__dirname, "../fixture");

AWS.config.update({region: "ap-northeast-1"});
AWS.config.setPromisesDependency(Promise);
const localstack = new LocalStack(AWS);


// Load resources and fixtures
const resources: {[index: string]: any} = fs.readdirSync(resource_directory).reduce((collection: {[index: string]: any}, filename: string) => {
    const extension = path.extname(filename);
    if (extension !== ".js") {
        return collection;
    }

    const basename = filename.replace(extension, "");
    collection[basename] = require(path.resolve(resource_directory, filename));

    return collection;
}, {});
const fixtures: {[index: string]: any} = fs.readdirSync(fixture_directory).reduce((collection: {[index: string]: any}, filename: string) => {
    const extension = path.extname(filename);
    if (extension !== ".js") {
        return collection;
    }

    const basename = filename.replace(extension, "");
    collection[basename] = require(path.resolve(fixture_directory, basename));

    return collection;
}, {});


// Export modules
export = async (): Promise<LocalStack> => {
    if (initialized) {
        return Promise.resolve(localstack);
    }

    await localstack.start();
    await Promise.all(Object.keys(resources).reduce((collection, key) => {
        if (key.substring(0, 5).toLowerCase() === "table") {
            const schema = resources[key].Properties;
            collection.push(localstack.dynamodb.schema(schema));
        }

        if (key.substring(0, 6).toLowerCase() === "bucket") {
            if (key.substring(6, 12).toLocaleLowerCase() !== "policy") {
                collection.push(localstack.s3.bucket(resources[key].Properties));
            }
        }

        return collection;
    }, []));

    await Promise.all(Object.keys(fixtures).map((key) => {
        return Promise.all(fixtures[key].map((data: AWS.DynamoDB.DocumentClient.PutItemInput) => {
            return localstack.dynamodb.client.put(data).promise();
        }));
    }));

    initialized = true;

    return Promise.resolve(localstack);
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
