import { HeaderHTMLObject, FooterHTMLObject } from "../../page_cls_module";
import * as AWS from "aws-sdk"



export interface IHeaderFooterHTMLRepository {
    getHeaderHTMLObject(id: string): Promise<HeaderHTMLObject | null>
    getFooterHTML(id: string): Promise<FooterHTMLObject | null>
    createHeaderHTMLObject(htmlObject: HeaderHTMLObject): Promise<boolean>
    createFooterHTMLObject(htmlObject: FooterHTMLObject): Promise<boolean>
    updateHeaderHTMLObject(htmlObject: HeaderHTMLObject): Promise<boolean>
    updateFooterHTMLObject(htmlObject: FooterHTMLObject): Promise<boolean>
}


export class HeaderFooterHTMLRepository implements IHeaderFooterHTMLRepository {
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

    scan(
        scanParams: AWS.DynamoDB.DocumentClient.ScanInput
    ): Promise<(HeaderHTMLObject | FooterHTMLObject)[]> {
        return new Promise((resolve) => {
            this.documentClient.scan(scanParams, (
                err: AWS.AWSError,
                data: AWS.DynamoDB.DocumentClient.ScanOutput,
            ) => {
                if (err) throw err
                const items = data.Items as (HeaderHTMLObject | FooterHTMLObject)[]
                if (process.env.NODE_ENV === "production") console.log(`items`, items)
                resolve(items)
            });
        })
    }

    private extractHeaderOrFooter(headerOrFooter: "header" | "footer", templateVersion: string, bootstrapVersion: string): Promise<HeaderHTMLObject | FooterHTMLObject | null> { // TODO
        return new Promise((resolve) => {
            const millisecondsBefore = minutesAbandonedCart * 60 * 1000
            const timestampBefore = Date.now() - millisecondsBefore
            const ExpressionAttributeNames = {
                '#updateDate': 'updateDate',
            }
            const ExpressionAttributeValues = {
                ':updateDate': timestampBefore,
            }
            const FilterExpression = '#updateDate < :updateDate'
            const Limit: number | undefined = 1
            // const ExpressionAttributeNames = {
            //     '#abandonedCartStatus': 'abandonedCartStatus',
            //     '#updateDate': 'updateDate',
            // }
            // const ExpressionAttributeValues = {
            //     ':abandonedCartStatusSuccess': 'AUTO_CREATION_SUCCESS',
            //     ':abandonedCartStatusError': 'AUTO_CREATION_ERROR',
            //     ':updateDate': timestampBefore,
            // }
            // const FilterExpression = '#abandonedCartStatus <> :abandonedCartStatusSuccess and #abandonedCartStatus <> :abandonedCartStatusError and #updateDate < :updateDate'
            // const Limit: number | undefined = batchSize

            const TableName = process.env.DYNAMO_TABLE_NAME_STATE
            if (!TableName) throw new Error("DYNAMO_TABLE_NAME_STATE is a mandatory env parameter")
            const scanParams: AWS.DynamoDB.DocumentClient.ScanInput = {
                TableName,
                ExpressionAttributeNames,
                ExpressionAttributeValues,
                FilterExpression,
                Limit,
            };

            this.documentClient.scan(scanParams, (
                err: AWS.AWSError,
                data: AWS.DynamoDB.DocumentClient.ScanOutput,
            ) => {
                if (err) throw err
                const items = data.Items as DTO.StateObject[]
                if (process.env.NODE_ENV === "production") console.log(`items`, items)
                resolve(items[0] || null)
            });
        })
    }

    async findHeaderHTMLObject(templateVersion: string, bootstrapVersion: string): Promise<HeaderHTMLObject | null> {
        const header: HeaderHTMLObject | null = await this.extractHeaderOrFooter("header", templateVersion, bootstrapVersion) as HeaderHTMLObject | null
        return header
    }
    async findFooterHTML(templateVersion: string, bootstrapVersion: string) {
        const footer: FooterHTMLObject | null = await this.extractHeaderOrFooter("footer", templateVersion, bootstrapVersion) as FooterHTMLObject | null
        return footer
    }

    getHeaderHTMLObject(id: string): Promise<HeaderHTMLObject | null> {
        return new Promise((resolve) => {
            const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
                TableName: this.tableName,
                Key: { id },
            };
            this.documentClient.get(params, (err: AWS.AWSError, data: AWS.DynamoDB.DocumentClient.GetItemOutput) => {
                if (err) throw err
                const item = data.Item as HeaderHTMLObject | null
                if (!item) return null
                resolve(item)
            });
        })
    }
    getFooterHTML(id: string): Promise<FooterHTMLObject | null> {
        return new Promise((resolve) => {
            const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
                TableName: this.tableName,
                Key: { id },
            };
            this.documentClient.get(params, (err: AWS.AWSError, data: AWS.DynamoDB.DocumentClient.GetItemOutput) => {
                if (err) throw err
                const item = data.Item as FooterHTMLObject | null
                if (!item) return null
                resolve(item)
            });
        })
    }
    createHeaderHTMLObject(htmlObject: HeaderHTMLObject): Promise<boolean> {
        return new Promise((resolve) => {
            const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
                TableName: this.tableName,
                Item: {htmlObject},
            };
            this.documentClient.put(params, (err: AWS.AWSError, data: AWS.DynamoDB.DocumentClient.PutItemOutput) => {
                if (err) resolve(false)
                resolve(true)
            });
        })
    }
    createFooterHTMLObject(htmlObject: FooterHTMLObject): Promise<boolean> {
        return new Promise((resolve) => {
            const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
                TableName: this.tableName,
                Item: {htmlObject},
            };
            this.documentClient.put(params, (err: AWS.AWSError, data: AWS.DynamoDB.DocumentClient.PutItemOutput) => {
                if (err) resolve(false)
                resolve(true)
            });
        })
    }
    updateHeaderHTMLObject(htmlObject: HeaderHTMLObject): Promise<boolean> {
        return new Promise((resolve) => {
            const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = HeaderFooterHTMLRepository.getUpdateItemParams(this.tableName, {htmlObject})
            this.documentClient.update(params, (err: AWS.AWSError, data: AWS.DynamoDB.DocumentClient.UpdateItemOutput) => {
                if (err) resolve(false)
                resolve(true);
            });
        })
    }
    updateFooterHTMLObject(htmlObject: FooterHTMLObject): Promise<boolean> {
        return new Promise((resolve) => {
            const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = HeaderFooterHTMLRepository.getUpdateItemParams(this.tableName, {htmlObject})
            this.documentClient.update(params, (err: AWS.AWSError, data: AWS.DynamoDB.DocumentClient.UpdateItemOutput) => {
                if (err) resolve(false)
                resolve(true);
            });
        })
    }

    static getUpdateItemParams(tableName: string, item: {[key: string]: any}): AWS.DynamoDB.DocumentClient.UpdateItemInput {
        delete item["uuid"] // cannot update key
        const pk: string | undefined = item.uuid
        if (!pk) throw new Error("pk cannot be undefined")
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
                'uuid': pk
            },
            ReturnValues: 'UPDATED_NEW'
        };
        return params
    }


    static unmarshallState(obj: {[key: string]: any}) { // TODO use real fields
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

        return HeaderFooterHTMLRepository.deleteUndefinedFields({
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

    static deleteUndefinedFields(obj: {[key: string]: any}): {[key: string]: any} {
        Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});
        return obj
    }

}
