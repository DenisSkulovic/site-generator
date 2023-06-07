import { Repository } from "./Repository"
import { TableEnum } from "./TableEnum"

export class ProductRepository extends Repository {
    constructor() {
        const tableName = TableEnum.PRODUCT
        const region = process.env.REGION
        if (!region) throw new Error("REGION is a mandatory env param")
        super(tableName, region)
    }

}