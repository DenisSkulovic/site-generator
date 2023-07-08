import { DocumentClient, Key } from "aws-sdk/clients/dynamodb";
export declare class Repository {
    protected docClient: DocumentClient;
    protected tableName: string;
    constructor(tableName: string, region: string);
    putItem(item: any): Promise<void>;
    putItems(items: any[]): Promise<void>;
    getItem(key: Key): Promise<any>;
    deleteItem(key: Key): Promise<void>;
    getAllItems(): Promise<any[]>;
    queryItems(partitionKey: string, partitionValue: string): Promise<any[]>;
}
//# sourceMappingURL=Repository.d.ts.map