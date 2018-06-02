/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';


// Import modules
import expect = require("expect.js");
import DynamoDB = require("../../lib/service/dynamodb");


// Parameters
const parameters: {[index: string]: any} = {
    id: 1,
    name: "Kosaka Honoka",
    age: 16,
    birthday: "August 3",
    constellation: "Leo",
    blood_type: "O",
    height: 157,
    bust: 78,
    waist: 58,
    hip: 82,
    like: "Strawberries",
    dislike: "Bell peppers"
};


describe("service", () => {
    describe("dynamodb", () => {
        describe("buildUpdateParameter", () => {
            describe("Should build update parameter", () => {
                describe("Parameters only", () => {
                    it("Parameters only", () => {
                        const result = DynamoDB.buildUpdateParameter(parameters);

                        expect(result).to.eql({
                            Key: {},
                            ExpressionAttributeNames: {
                                "#id": "id",
                                "#name": "name",
                                "#age": "age",
                                "#birthday": "birthday",
                                "#constellation": "constellation",
                                "#blood_type": "blood_type",
                                "#height": "height",
                                "#bust": "bust",
                                "#waist": "waist",
                                "#hip": "hip",
                                "#like": "like",
                                "#dislike": "dislike"
                            },
                            ExpressionAttributeValues: {
                                ":id": parameters.id,
                                ":name": parameters.name,
                                ":age": parameters.age,
                                ":birthday": parameters.birthday,
                                ":constellation": parameters.constellation,
                                ":blood_type": parameters.blood_type,
                                ":height": parameters.height,
                                ":bust": parameters.bust,
                                ":waist": parameters.waist,
                                ":hip": parameters.hip,
                                ":like": parameters.like,
                                ":dislike": parameters.dislike
                            },
                            UpdateExpression: "SET #id = :id, #name = :name, #age = :age, #birthday = :birthday, "
                            + "#constellation = :constellation, #blood_type = :blood_type, #height = :height, "
                            + "#bust = :bust, #waist = :waist, #hip = :hip, #like = :like, #dislike = :dislike"
                        });
                    });
                });

                describe("Parameters and key", () => {
                    it("String key", () => {
                        const keys = "id";
                        const result = DynamoDB.buildUpdateParameter(parameters, keys);
                        const key_object: {[index: string]: number} = {};
                        key_object[keys] = parameters[keys];

                        expect(result).to.eql({
                            Key: key_object,
                            ExpressionAttributeNames: {
                                "#name": "name",
                                "#age": "age",
                                "#birthday": "birthday",
                                "#constellation": "constellation",
                                "#blood_type": "blood_type",
                                "#height": "height",
                                "#bust": "bust",
                                "#waist": "waist",
                                "#hip": "hip",
                                "#like": "like",
                                "#dislike": "dislike"
                            },
                            ExpressionAttributeValues: {
                                ":name": parameters.name,
                                ":age": parameters.age,
                                ":birthday": parameters.birthday,
                                ":constellation": parameters.constellation,
                                ":blood_type": parameters.blood_type,
                                ":height": parameters.height,
                                ":bust": parameters.bust,
                                ":waist": parameters.waist,
                                ":hip": parameters.hip,
                                ":like": parameters.like,
                                ":dislike": parameters.dislike
                            },
                            UpdateExpression: "SET #name = :name, #age = :age, #birthday = :birthday, "
                            + "#constellation = :constellation, #blood_type = :blood_type, #height = :height, "
                            + "#bust = :bust, #waist = :waist, #hip = :hip, #like = :like, #dislike = :dislike"
                        });
                    });

                    it("Array key", () => {
                        const keys = ["id"];
                        const result = DynamoDB.buildUpdateParameter(parameters, keys);
                        const key_object = keys.reduce((collection: {[index: string]: any}, key: any) => {
                            collection[key] = parameters[key];

                            return collection;
                        }, {});

                        expect(result).to.eql({
                            Key: key_object,
                            ExpressionAttributeNames: {
                                "#name": "name",
                                "#age": "age",
                                "#birthday": "birthday",
                                "#constellation": "constellation",
                                "#blood_type": "blood_type",
                                "#height": "height",
                                "#bust": "bust",
                                "#waist": "waist",
                                "#hip": "hip",
                                "#like": "like",
                                "#dislike": "dislike"
                            },
                            ExpressionAttributeValues: {
                                ":name": parameters.name,
                                ":age": parameters.age,
                                ":birthday": parameters.birthday,
                                ":constellation": parameters.constellation,
                                ":blood_type": parameters.blood_type,
                                ":height": parameters.height,
                                ":bust": parameters.bust,
                                ":waist": parameters.waist,
                                ":hip": parameters.hip,
                                ":like": parameters.like,
                                ":dislike": parameters.dislike
                            },
                            UpdateExpression: "SET #name = :name, #age = :age, #birthday = :birthday, "
                            + "#constellation = :constellation, #blood_type = :blood_type, #height = :height, "
                            + "#bust = :bust, #waist = :waist, #hip = :hip, #like = :like, #dislike = :dislike"
                        });
                    });

                    it("Object key", () => {
                        const keys = {"id": parameters.id};
                        const result = DynamoDB.buildUpdateParameter(parameters, keys);

                        expect(result).to.eql({
                            Key: keys,
                            ExpressionAttributeNames: {
                                "#name": "name",
                                "#age": "age",
                                "#birthday": "birthday",
                                "#constellation": "constellation",
                                "#blood_type": "blood_type",
                                "#height": "height",
                                "#bust": "bust",
                                "#waist": "waist",
                                "#hip": "hip",
                                "#like": "like",
                                "#dislike": "dislike"
                            },
                            ExpressionAttributeValues: {
                                ":name": parameters.name,
                                ":age": parameters.age,
                                ":birthday": parameters.birthday,
                                ":constellation": parameters.constellation,
                                ":blood_type": parameters.blood_type,
                                ":height": parameters.height,
                                ":bust": parameters.bust,
                                ":waist": parameters.waist,
                                ":hip": parameters.hip,
                                ":like": parameters.like,
                                ":dislike": parameters.dislike
                            },
                            UpdateExpression: "SET #name = :name, #age = :age, #birthday = :birthday, "
                            + "#constellation = :constellation, #blood_type = :blood_type, #height = :height, "
                            + "#bust = :bust, #waist = :waist, #hip = :hip, #like = :like, #dislike = :dislike"
                        });
                    });
                });

                describe("Parameters, Keys, Options", () => {
                    it("Parameters, Keys, Options", () => {
                        const keys = {id: parameters.id};
                        const options = {TableName: "profile"};
                        const result = DynamoDB.buildUpdateParameter(parameters, keys, options);

                        expect(result).to.eql({
                            TableName: options.TableName,
                            Key: keys,
                            ExpressionAttributeNames: {
                                "#name": "name",
                                "#age": "age",
                                "#birthday": "birthday",
                                "#constellation": "constellation",
                                "#blood_type": "blood_type",
                                "#height": "height",
                                "#bust": "bust",
                                "#waist": "waist",
                                "#hip": "hip",
                                "#like": "like",
                                "#dislike": "dislike"
                            },
                            ExpressionAttributeValues: {
                                ":name": parameters.name,
                                ":age": parameters.age,
                                ":birthday": parameters.birthday,
                                ":constellation": parameters.constellation,
                                ":blood_type": parameters.blood_type,
                                ":height": parameters.height,
                                ":bust": parameters.bust,
                                ":waist": parameters.waist,
                                ":hip": parameters.hip,
                                ":like": parameters.like,
                                ":dislike": parameters.dislike
                            },
                            UpdateExpression: "SET #name = :name, #age = :age, #birthday = :birthday, "
                            + "#constellation = :constellation, #blood_type = :blood_type, #height = :height, "
                            + "#bust = :bust, #waist = :waist, #hip = :hip, #like = :like, #dislike = :dislike"
                        });
                    });
                });
            });
        });
    });
});



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
