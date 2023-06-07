import { Repository } from "./Repository"
import {TableEnum} from "./TableEnum"

export class PageConfigRepository extends Repository {
    constructor() {
        const tableName = TableEnum.PAGE_CONFIG
        const region = process.env.REGION
        if (!region) throw new Error("REGION is a mandatory env param")
        super(tableName, region)
    }
}