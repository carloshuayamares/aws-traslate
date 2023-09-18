const transformers = require('json-schema-dynamo')

const schema = {
  type: 'object',
  properties: {
    nombre: {
      type: 'string',
      required: true,
    },
    apellido: {
        type: 'string',
        required: true,
    },
    celular: {
      type: 'number',
      required: true,
    },
    edad: {
        type: 'number',
        required: true,
    },
    humano: {
        type: 'boolean',
        default: true,
    },
  }
}

module.exports = async (body) => {
    try {
        var item = transformers.fromModelToDynamoItem(schema, body)
        var newModel = transformers.fromDynamoItemToModel(schema, item)
        return newModel
    } catch (e) {
        return {
            success: false,
            message: e.message,
        }
    }
}

