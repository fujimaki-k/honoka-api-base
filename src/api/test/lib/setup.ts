/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules
import fs = require("fs");
import path = require("path");
import AWS = require("aws-sdk");
import LocalStack = require("./localstack");


// Declaration
interface SchemaObject {
    [index: string]: AWS.DynamoDB.CreateTableInput
}

interface FixtureObject {
    [index: string]: Array<AWS.DynamoDB.DocumentClient.PutItemInput>
}


// Variables
const schema_directory = path.resolve(__dirname, "../../../../templates/resources");
const fixture_directory = path.resolve(__dirname, "../fixture");

// Load schema and fixtures
const schema: SchemaObject = fs.readdirSync(schema_directory).reduce((collection: {[index: string]: any}, value: string) => {
    const extension = path.extname(value);
    if (extension !== ".js" || value.substring(0, 5) !== "Table") {
        return collection;
    }

    const basename = value.replace(extension, "");
    const key = basename.substring(5).toLowerCase();
    const data = require(path.resolve(schema_directory, basename));
    collection[key] = data.Properties;

    return collection;
}, {});
const fixtures: FixtureObject = fs.readdirSync(fixture_directory).reduce((collection: {[index: string]: any}, value: string) => {
    const extension = path.extname(value);
    if (extension !== ".js") {
        return collection;
    }

    const basename = value.replace(extension, "");
    const key = basename.toLowerCase();
    collection[key] = require(path.resolve(fixture_directory, basename));

    return collection;
}, {});


// Export module
export = (localstack: LocalStack) => {
    return Promise.all(Object.keys(schema).map((key) => {
        return localstack.dynamodb.schema(key, schema[key]);
    })).then(() => {
        return Promise.all(Object.keys(fixtures).map((key) => {
            return fixtures[key].reduce((collection, fixture) => {
                return collection.then(() => {
                    return localstack.dynamodb.fixture(fixture);
                });
            }, Promise.resolve());
        }));
    });
}



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
