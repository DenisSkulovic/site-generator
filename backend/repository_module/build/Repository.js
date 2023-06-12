"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const AWS = __importStar(require("aws-sdk"));
class Repository {
    constructor(tableName, region) {
        this.tableName = tableName;
        AWS.config.update({ region }); // set your region
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }
    async putItem(item) {
        const params = {
            TableName: this.tableName,
            Item: item
        };
        try {
            await this.docClient.put(params).promise();
            console.log("Added item:", JSON.stringify(item));
        }
        catch (error) {
            console.error("Unable to add item. Error:", JSON.stringify(error));
        }
    }
    async putItems(items) {
        const requests = items.map((item) => ({
            PutRequest: {
                Item: item,
            },
        }));
        const params = {
            RequestItems: {
                [this.tableName]: requests,
            },
        };
        try {
            await this.docClient.batchWrite(params).promise();
            console.log("Added items:", JSON.stringify(items));
        }
        catch (error) {
            console.error("Unable to add items. Error:", JSON.stringify(error));
        }
    }
    async getItem(key) {
        const params = {
            TableName: this.tableName,
            Key: key
        };
        try {
            const data = await this.docClient.get(params).promise();
            return data.Item;
        }
        catch (error) {
            console.error("Unable to read item. Error:", JSON.stringify(error));
        }
    }
    async deleteItem(key) {
        const params = {
            TableName: this.tableName,
            Key: key
        };
        try {
            await this.docClient.delete(params).promise();
            console.log("Deleted item:", JSON.stringify(key));
        }
        catch (error) {
            console.error("Unable to delete item. Error:", JSON.stringify(error));
        }
    }
    async getAllItems() {
        const params = {
            TableName: this.tableName
        };
        try {
            const data = await this.docClient.scan(params).promise();
            return data.Items || [];
        }
        catch (error) {
            throw new Error("Unable to scan items. Error: " + JSON.stringify(error));
        }
    }
}
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map