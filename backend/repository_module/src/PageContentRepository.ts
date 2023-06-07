import { Repository } from "./Repository"
import {TableEnum} from "./TableEnum"

export class PageContentRepository extends Repository {
    constructor() {
        const tableName = TableEnum.PAGE_CONTENT
        const region = process.env.REGION
        if (!region) throw new Error("REGION is a mandatory env param")
        super(tableName, region)
    }
}