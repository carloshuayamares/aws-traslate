# aws-traslate
API con conexion a AWS y a SWAPI, que traduce las llaves a español y almacena datos en DynamoDB.

Para realizar pruebas, tiene que hacer consultas a las siguientes endpoints:
  Traduccion de SWAPI:
    1. GET - https://zjlvihs5xc.execute-api.us-east-1.amazonaws.com/dev/swapi/{route}
    2. GET - https://zjlvihs5xc.execute-api.us-east-1.amazonaws.com/dev/swapi/{route}/{subRoute}
  Conexion a DynamoDB:
    3. GET - https://zjlvihs5xc.execute-api.us-east-1.amazonaws.com/dev/dynamo/{id}
    4. POST - https://zjlvihs5xc.execute-api.us-east-1.amazonaws.com/dev/dynamo

Cada endpoint tiene una documentacion detallada en swagger: https://app.swaggerhub.com/apis/CARLOSHUAYAMARESD/swagger/1.0.0
