import { Key } from "aws-sdk/clients/dynamodb"
import { Repository } from "./Repository"
import {TableEnum} from "./TableEnum"

export class PagemetaRepository extends Repository {
    constructor(tableName: TableEnum) {
        const region = process.env.REGION
        if (!region) throw new Error("REGION is a mandatory env param")
        super(tableName, region)
    }

    async getPagemeta(path: string): Promise<any> {
        const item = this.getItem({path} as Key)
        return item
    }
}