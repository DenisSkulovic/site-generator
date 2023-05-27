import { StateObject } from "../../../../requests-module";
import { LooseObject } from "@/types/types";
import * as AWS from "aws-sdk"
import * as DTO from "../../page_cls_module"



export interface IPageHTMLRepository {
    getHTMLConfig(id: string): Promise<string>
    createHTMLConfig(html: string): Promise<boolean>
    updateHTMLConfig(id: string, html: string): Promise<boolean>
}


export class PageHTMLRepository implements IPageHTMLRepository {
    private client: AWS.DynamoDB
    private documentClient: AWS.DynamoDB.DocumentClient
    private tableName: string
    constructor() {
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID_
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_
        if (process.env.ENV === "test" && (!accessKeyId || !secretAccessKey)) throw new Error("AWS_ACCESS_KEY_ID_ and AWS_SECRET_ACCESS_KEY_ environment variables are mandatory")
        AWS.config.update({
            apiVersion: '2012-10-08',
            accessKeyId,
            secretAccessKey,
        })
        const tableName = process.env.DYNAMO_TABLE_NAME_STATE
        const region = process.env.DYNAMO_REGION
        if (!tableName) throw new Error("DYNAMO_TABLE_NAME_STATE is a mandatory env parameter")
        if (!region) throw new Error("DYNAMO_REGION is a mandatory env parameter")
        this.tableName = tableName
        this.client = new AWS.DynamoDB({
            region,
        });

        this.documentClient = new AWS.DynamoDB.DocumentClient({
            region,
        });
    }

    getPageConfig(id: string): Promise<DTO.PageConfig>{
        return new Promise((resolve) => {
            const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
                TableName: this.tableName,
                Key: { token },
            };
            this.documentClient.get(params, (err: AWS.AWSError, data: AWS.DynamoDB.DocumentClient.GetItemOutput) => {
                if (err) throw err
                const item = data.Item as StateObject | null
                if (!item) return null
                resolve(item)
            });
        })
    }

    createPageConfig(config: DTO.PageConfig): Promise<boolean>{
        return new Promise((resolve) => {
            const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
                TableName: this.tableName,
                Item: JSON.parse(JSON.stringify(state)),
            };
            this.documentClient.put(params, (err: AWS.AWSError, data: AWS.DynamoDB.DocumentClient.PutItemOutput) => {
                if (err) throw err
                resolve(null)
            });
        })
    }

    updatePageConfig(config: DTO.PageConfig): Promise<boolean>{
        return new Promise((resolve) => {
            const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = PageHTMLRepository.getUpdateItemParams(this.tableName, JSON.parse(JSON.stringify(state)), token)
            this.documentClient.update(params, (err: AWS.AWSError, data: AWS.DynamoDB.DocumentClient.UpdateItemOutput) => {
                if (err) throw err
                resolve(null);
            });
        })
    }

    static getUpdateItemParams(tableName: string, item: LooseObject, pk: string): AWS.DynamoDB.DocumentClient.UpdateItemInput {
        delete item["token"] // cannot update key
        const itemKeys = Object.keys(item).filter(k => k !== pk);
        const params = {
            TableName: tableName,
            UpdateExpression: `SET ${itemKeys.map((k: any, index: any) => `#field${index} = :value${index}`).join(', ')}`,
            ExpressionAttributeNames: itemKeys.reduce((accumulator: any, k: any, index: any) => ({
                ...accumulator,
                [`#field${index}`]: k
            }), {}),
            ExpressionAttributeValues: itemKeys.reduce((accumulator: any, k: any, index: any) => ({
                ...accumulator,
                [`:value${index}`]: item[k]
            }), {}),
            Key: {
                'token': pk
            },
            ReturnValues: 'UPDATED_NEW'
        };
        return params
    }


    static unmarshallState(obj: LooseObject) { // TODO use real fields
        const token = obj.token["S"]
        const creationDate = obj.creationDate["N"]
        const updateDate = obj.updateDate["N"]
        const request = JSON.parse(obj.request["S"])
        const response = JSON.parse(obj.response["S"])
        const executionTime = obj.executionTime["N"]
        const executionDateTime = obj.executionDateTime["S"]
        const bookingReference = obj.bookingReference["S"]
        const status = obj.status["S"]
        const showAlternativePrices = JSON.parse(obj.showAlternativePrices["S"])
        const promocode = obj.promocode["S"]
        const abandonedCartStatus = obj.abandonedCartStatus["S"]

        return PageHTMLRepository.deleteUndefinedFields({
            token,
            creationDate,
            updateDate,
            request,
            response,
            executionTime,
            executionDateTime,
            bookingReference,
            status,
            showAlternativePrices,
            promocode,
            abandonedCartStatus,
        })
    }

    static deleteUndefinedFields(obj: LooseObject): LooseObject {
        Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});
        return obj
    }

}
