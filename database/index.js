require("dotenv").config();
const fileToImport = require("./dictionary.json");
const AWS = require("aws-sdk");
const credentials = new AWS.Credentials(
  process.env.ACCESS_KEY_ID,
  process.env.SECRET_ACCESS_KEY
);
AWS.config.update({ credentials: credentials, region: "eu-central-1" });
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "dictionary2";

/* 
  Save json data
*/
const handler = async () => {
  const allData = fileToImport.map((item, index) => ({
    Id: index + 1,
    ...item,
  }));
  for (let item of allData) {
    await dynamoDb
      .put({ TableName: TABLE_NAME, Item: item })
      .promise()
      .then(() => {
        console.log(`${item.Id} : ${item.word}`);
      })
      .catch((err) => {
        console.log(`failed`);
      });
  }
};
handler();
