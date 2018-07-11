/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules
import child_process = require("child_process");
import AWS = require("aws-sdk");


// Variables
const command = 'docker inspect --format "{{.NetworkSettings.IPAddress}}" localstack';


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
    public s3: S3;


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
                        this.s3 = new S3({
                            endpoint: `http://${this.host}:${this.ports.S3}`,
                            s3ForcePathStyle: true
                        }, this.aws);

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
     * @param {Object} parameters
     * @returns {Promise}
     */
    schema(parameters: AWS.DynamoDB.CreateTableInput): Promise<any> {
        if (this.schemas[parameters.TableName]) {
            return Promise.resolve();
        }

        return this.dynamodb.createTable(parameters).promise().then((result) => {
            this.schemas[parameters.TableName] = parameters;

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

class S3 {
    public aws = AWS;
    public s3: AWS.S3;

    public url: string = "http://localhost:4572";
    public buckets: {[index: string]: any} = {};

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
        this.s3 = new this.aws.S3(Object.assign(options, parameters));
    }

    /**
     * Create bucket
     *
     * @param {Object} parameters
     * @returns {Promise}
     */
    bucket(parameters: {[index: string]: any}): Promise<any> {
        const name = parameters.Bucket || parameters.BucketName;
        const acl = parameters.ACL || parameters.AccessControl || "public_read";
        if (this.buckets[name]) {
            return Promise.resolve();
        }

        return this.s3.createBucket({
            Bucket: name,
            ACL: acl.toLocaleLowerCase()
        }).promise().then((result) => {
            this.buckets[name] = parameters;

            return Promise.resolve(result);
        });
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
