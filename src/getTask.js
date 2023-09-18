'use strict';
const AWS = require("aws-sdk")

const controllers = require('../controllers')

const getSwapiOne = async (event) => {
    try {
        const obj_traslated = await controllers.getLambda(event.pathParameters.route, event.pathParameters.subRoute)
        if (obj_traslated.success === false) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(obj_traslated, null, 2)
            }
        }

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                success: true,
                message: 'Keys traducidas correctamente.',
                keys_traducidas: obj_traslated
            }, null, 2)
        }

    } catch (e) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                success: false,
                message: e.message,
            })
        }
    }
}

const getSwapiAll = async (event) => {
    try {
        const obj_traslated = await controllers.getLambdaAll(event.pathParameters.route)
        if (obj_traslated.success === false) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },    
                body: JSON.stringify(obj_traslated, null, 2)
            }
        }

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                success: true,
                message: 'Keys traducidas correctamente.',
                keys_traducidas: obj_traslated
            }, null, 2)
        }

    } catch (e) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                success: false,
                message: e.message,
            })
        }
    }
}

const getDynamo = async (event) => {

    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
  
        const { id } = event.pathParameters;
        console.log({id})
        const result = await dynamodb
          .get({
            TableName: "TaskTable",
            Key: { id },
          })
          .promise();
      
        const task = result.Item;
        if (typeof task === 'undefined') {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },    
                body: JSON.stringify({
                    success: false,
                    message: 'No se encontró un registro en DynamoDB con el Id indicado.'
                })
            }
        }
      
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(task, null, 2),
        };

    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                success: false,
                message: e.message
            })
        }
    }
};

module.exports = {
    getSwapiOne,
    getSwapiAll,
    getDynamo,
};
