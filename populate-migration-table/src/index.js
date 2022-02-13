const { DynamoDBClient, BatchWriteItemCommand } = require("@aws-sdk/client-dynamodb");
const fs = require("fs");

const client =  new DynamoDBClient({region: "ap-southeast-2"});
const tableName = "";
const batchSize = 25;

const fileData = fs.readFileSync("users.json");
const users = JSON.parse(fileData);

const dbEntries = users.map(entry => {
    const result = 
    {
        PutRequest: {
            Item: {
                email: { S: entry.email },
                uid: { S: entry.uid }
            }
        }
    };
    return result;
});

const run = async (batch) => {
    try {
        const data = await client.send(new BatchWriteItemCommand(batch));
        console.log("Success, items inserted", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
};

for (let i = 0; i < dbEntries.length; i += batchSize) {
    const params = {
        RequestItems: {
        }
    };
    
    params.RequestItems[tableName] = dbEntries.slice(i, i+batchSize);
    run(params);
}
