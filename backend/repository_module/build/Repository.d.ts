import { DocumentClient } from "aws-sdk/clients/dynamodb";
export declare class Repository {
    protected docClient: DocumentClient;
    protected tableName: string;
    constructor(tableName: string, region: string);
    putItem(item: any): Promise<void>;
    putItems(items: any[]): Promise<void>;
    getItem(key: any): Promise<any>;
    deleteItem(key: any): Promise<void>;
    getAllItems(): Promise<any[]>;
}
//# sourceMappingURL=Repository.d.ts.map