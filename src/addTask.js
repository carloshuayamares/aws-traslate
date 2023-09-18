'use strict';
const { v4 } = require('uuid')
const AWS = require('aws-sdk')

const controllers = require('../controllers')

const middy = require("@middy/core");
const httpJSONBodyParser = require("@middy/http-json-body-parser");

const addDynamo = async (event) => {

    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const { body } = event
    
        let createdAt = new Date();
        createdAt = JSON.stringify(createdAt)
        const id = v4();

        const verify = await controllers.postLambda(body)
        if (verify.success === false) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },    
                body: JSON.stringify({
                    success: false,
                    message: verify.message,
                })
            }
        }

        const newTask = {
            id,
            ...verify,
            createdAt,
        }

        await dynamodb.put({
          TableName: "TaskTable",
          Item: newTask,
        }).promise();
    
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                success: true,
                id: id,
                message: 'El registro se creó correctamente.',
                inserted: newTask
            }),
        };
    
    } catch (e) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            message: 'Error.'
        }
    }
}

module.exports = {
    addDynamo: middy(addDynamo).use(httpJSONBodyParser()),
};
