import * as AWS from "aws-sdk";
import { DocumentClient, Key } from "aws-sdk/clients/dynamodb";

export class Repository {
    protected docClient: DocumentClient;
    protected tableName: string

    constructor(tableName: string, region: string) {
        this.tableName = tableName
        AWS.config.update({ region }); // set your region
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    async putItem(item: any): Promise<void> {
        const params: DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: item
        };
        try {
            await this.docClient.put(params).promise();
            console.log("Added item:", JSON.stringify(item));
        } catch (error) {
            console.error("Unable to add item. Error:", JSON.stringify(error));
        }
    }

    async putItems(items: any[]): Promise<void> {
        const requests = items.map((item) => ({
            PutRequest: {
                Item: item,
            },
        }));

        const params: DocumentClient.BatchWriteItemInput = {
            RequestItems: {
                [this.tableName]: requests,
            },
        };

        try {
            await this.docClient.batchWrite(params).promise();
            console.log("Added items:", JSON.stringify(items));
        } catch (error) {
            console.error("Unable to add items. Error:", JSON.stringify(error));
        }
    }

    async getItem(key: Key): Promise<any> {
        const params: DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: key
        };
        try {
            const data = await this.docClient.get(params).promise();
            return data.Item;
        } catch (error) {
            console.error("Unable to read item. Error:", JSON.stringify(error));
        }
    }

    async deleteItem(key: Key): Promise<void> {
        const params: DocumentClient.DeleteItemInput = {
            TableName: this.tableName,
            Key: key
        };
        try {
            await this.docClient.delete(params).promise();
            console.log("Deleted item:", JSON.stringify(key));
        } catch (error) {
            console.error("Unable to delete item. Error:", JSON.stringify(error));
        }
    }
    async getAllItems(): Promise<any[]> {
        const params: DocumentClient.ScanInput = {
            TableName: this.tableName
        };
        try {
            const data = await this.docClient.scan(params).promise();
            return data.Items || [];
        } catch (error) {
            throw new Error("Unable to scan items. Error: " + JSON.stringify(error));
        }
    }
}