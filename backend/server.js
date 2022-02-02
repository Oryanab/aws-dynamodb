require("dotenv").config();
const AWS = require("aws-sdk");
const credentials = new AWS.Credentials(
  process.env.ACCESS_KEY_ID,
  process.env.SECRET_ACCESS_KEY
);

AWS.config.update({ region: "eu-central-1" });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// PATHS
const healthRoute = "/health";
const searchWord = "/word/{word}";
const searchWordAndPartOfSpeech = "/word/{word}/{pos}";
const searchPartOfSpeech = "/part-of-speech/{pos}";
const searchWordPartOfSpeechByLetter = `/part-of-speech/{pos}?letter=`;

exports.handler = async (event) => {
  console.log("Request event: ", event);
  let response;
  switch (true) {
    case event.httpMethod === "GET" && event.resource === healthRoute:
      response = buildResponse(200);
      break;
    case event.httpMethod === "GET" && event.resource === searchWord:
      const { word } = event.pathParameters;
      console.log(word);
      response = await returnResultsByWord(word);
      break;
    case event.httpMethod === "GET" &&
      event.resource === searchWordAndPartOfSpeech:
      response = await returnWordAndPartOfSpeech(
        event.pathParameters.word,
        event.pathParameters.pos
      );
      break;
    case event.httpMethod === "GET" && event.resource === searchPartOfSpeech:
      response = await returnPartOfSpeech(event.pathParameters.pos);
      break;
    case event.httpMethod === "GET" &&
      event.resource === searchWordPartOfSpeechByLetter:
      response = await returnWordPartOfSpeechByLetter(
        event.pathParameters.pos,
        event.queryStringParameters.letter
      );
      break;
    default:
      response = buildResponse(404, "404 not found");
  }
  return response;
};

//buildResponse
const buildResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "OPTIONS,POST",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "*",
    },
    body: JSON.stringify(body),
  };
};

// return results by Word
const returnResultsByWord = async (word) => {
  const params = {
    KeyConditionExpression: "word = :word",
    ExpressionAttributeValues: {
      ":word": word,
    },
    TableName: "dictionary2",
  };
  return await dynamoDb
    .query(params)
    .promise()
    .then((response) => {
      return buildResponse(200, response.Items);
    })
    .catch(() => {
      return buildResponse(404, { error: "error" });
    });
};

//returnResultsByWord("ACCUMULATE");

// return Word And PartOfSpeech
const returnWordAndPartOfSpeech = async (word, pos) => {
  const params = {
    Key: {
      word,
      pos,
    },
    TableName: "dictionary2",
  };
  return await dynamoDb
    .get(params)
    .promise()
    .then((response) => {
      return buildResponse(200, response.Item);
    })
    .catch(() => {
      return buildResponse(404, { error: "error" });
    });
};
//returnWordAndPartOfSpeech("ACCUMULATE", "a.");

// return Part Of Speech by string
const returnPartOfSpeech = async (pos) => {
  let params = {
    FilterExpression: "contains(#pos, :pos)",
    ExpressionAttributeNames: {
      "#pos": "pos",
    },
    ExpressionAttributeValues: {
      ":pos": pos,
    },
    TableName: "dictionary2",
  };
  return await dynamoDb
    .scan(params)
    .promise()
    .then((response) => {
      const randNum = Math.floor(Math.random() * response.Count) + 1;
      return buildResponse(200, response.Items[randNum]);
    })
    .catch(() => {
      return buildResponse(404, { error: "error" });
    });
};
//returnPartOfSpeech("n.");

// return Word Part Of Speech By Letter

const returnWordPartOfSpeechByLetter = async (pos, word) => {
  let params = {
    FilterExpression: "contains(#pos, :pos) AND contains(#word, :word)",
    ExpressionAttributeNames: {
      "#pos": "pos",
      "#word": "word",
    },
    ExpressionAttributeValues: {
      ":pos": pos,
      ":word": word,
    },
    TableName: "dictionary2",
  };
  return await dynamoDb
    .scan(params)
    .promise()
    .then((response) => {
      const randNum = Math.floor(Math.random() * response.Count) + 1;
      return buildResponse(200, response.Items[randNum]);
    })
    .catch(() => {
      return buildResponse(404, { error: "error" });
    });
};

//returnWordPartOfSpeechByLetter("n.", "A");
