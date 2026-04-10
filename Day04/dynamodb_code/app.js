// db.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({
  region: "ap-south-1",
});

export const docClient = DynamoDBDocumentClient.from(client);

// addItem.js


export const addItem = async () => {
  const params = {
    TableName: "students",
    Item: {
      student_id: "110",     // Partition key
      name: "Mahesh",      
      age: 30,
    },
  };

  try {
    await docClient.send(new PutCommand(params));
    console.log("Item added successfully");
  } catch (err) {
    console.error("Error adding item:", err);
  }
};

addItem();

// queryItems.js


export const queryItems = async () => {
  const params = {
    TableName: "students",
    KeyConditionExpression: "student_id = :uid",
    ExpressionAttributeValues: {
      ":uid": "110",
    },
  };

  try {
    const data = await docClient.send(new QueryCommand(params));
    console.log("Query result:", data.Items);
  } catch (err) {
    console.error("Error querying:", err);
  }
};

queryItems();