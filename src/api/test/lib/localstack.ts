/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules
import child_process = require("child_process");
import AWS = require("aws-sdk");


// Variables
const command = 'docker inspect --format "{{.NetworkSettings.IPAddress}}" localstack';
AWS.config.setPromisesDependency(Promise);

// Declaration
interface Options {
    [index: string]: any
}

class LocalStack {
    public aws = AWS;
    private localstack: child_process.ChildProcess;

    public docker = "/usr/bin/docker";
    public arguments = [
        "run", "--rm", "--name", "localstack", "--publish", "4567-4583:4567-4583", "--publish", "8080:8080", "localstack/localstack"
    ];

    public status = "stopped";
    public host: string;
    public ports: {[index: string]: number} = {};

    public dynamodb: DynamoDB;

    /**
     * Constructor
     *
     * @param {object} aws
     */
    constructor(aws = AWS) {
        this.aws = aws;
    }

    /**
     * Start LocalStack
     *
     * @returns {Promise}
     */
    start(): Promise<void> {
        if (this.localstack) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            if (this.localstack) {
                return resolve();
            }

            this.localstack = child_process.spawn(this.docker, this.arguments);
            this.localstack.stdout.on("data", (data) => {
                data.toString().split(/\r\n|\r|\n/).forEach((line) => {
                    if (-1 < line.indexOf("Starting mock")) {
                        this.status = "starting";

                        const service = line.substring(14, line.indexOf('(') - 1).split(' ').join('');
                        this.ports[service] = Number(line.substring(line.lastIndexOf(' '), line.indexOf(')')));
                    }

                    if (-1 < line.indexOf("Ready.")) {
                        this.status = "running";
                        this.host = this.host || child_process.execSync(command).toString().trim();

                        this.dynamodb = new DynamoDB(`http://${this.host}:${this.ports.DynamoDB}`, this.aws);

                        resolve();
                    }
                });
            });
        });
    }

    /**
     * Stop LocalStack
     *
     * @returns {Promise<void>}
     */
    stop(): Promise<void> {
        this.localstack.kill("SIGTERM");

        return Promise.resolve();
    }
}


class DynamoDB {
    public aws = AWS;
    public dynamodb: AWS.DynamoDB;
    public client: AWS.DynamoDB.DocumentClient;

    public url: string = "http://localhost:4569";
    public schemas: {[index: string]: any} = {};

    /**
     *
     * @param {Options | string} options
     * @param {AWS} aws
     */
    constructor(options: Options|string = {}, aws = AWS) {
        this.aws = aws;
        options = (typeof options === "object") ? options : {
            endpoint: options
        };
        this.url = options.endpoint || this.url;

        const parameters = {
            endpoint: this.url
        };
        this.dynamodb = new this.aws.DynamoDB(Object.assign(options, parameters));
        this.client = new this.aws.DynamoDB.DocumentClient(Object.assign(options, parameters));
    }

    /**
     * Create table
     *
     * @param {string} name
     * @param {Object} parameters
     * @returns {Promise}
     */
    schema(name: string, parameters: AWS.DynamoDB.CreateTableInput): Promise<any> {
        if (this.schemas[name]) {
            return Promise.resolve();
        }

        return this.dynamodb.createTable(parameters).promise().then((result) => {
            this.schemas[name] = parameters;

            return Promise.resolve(result);
        });
    }

    /**
     * Load fixture
     *
     * @param {Object} parameter
     * @returns {Promise}
     */
    fixture(parameter: AWS.DynamoDB.DocumentClient.PutItemInput): Promise<any> {
        return this.client.put(parameter).promise();
    }
}


// Export module
export = LocalStack;



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
