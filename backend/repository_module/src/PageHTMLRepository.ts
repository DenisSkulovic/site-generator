import { Repository } from "./Repository"
import {TableEnum} from "./TableEnum"

export class PageHTMLRepository extends Repository {
    constructor() {
        const tableName = TableEnum.PAGE_HTML
        const region = process.env.REGION
        if (!region) throw new Error("REGION is a mandatory env param")
        super(tableName, region)
    }
}