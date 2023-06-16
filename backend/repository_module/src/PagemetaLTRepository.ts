import { Repository } from "./Repository"
import {TableEnum} from "./TableEnum"

export class PagemetaLTRepository extends Repository {
    constructor() {
        const tableName = TableEnum.PAGEMETA_LT
        const region = process.env.REGION
        if (!region) throw new Error("REGION is a mandatory env param")
        super(tableName, region)
    }
}