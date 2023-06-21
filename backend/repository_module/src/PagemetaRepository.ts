import { Repository } from "./Repository"
import {TableEnum} from "./TableEnum"
import {Pagemeta} from "../../../admin_cls_module"

export class PagemetaRepository extends Repository {
    constructor(tableName: TableEnum) {
        const region = process.env.REGION
        if (!region) throw new Error("REGION is a mandatory env param")
        super(tableName, region)
    }

    async getPagemeta(path: string): Promise<any> {
        const item = this.getItem({path: {S: path}})
        return item
    }
    async savePagemeta(pagemeta: Pagemeta): Promise<any> {
        const item = this.putItem(pagemeta)
        return item
    }
    async deletePagemeta(pagemeta: Pagemeta): Promise<any> {
        const item = this.putItem(pagemeta)
        return item
    }
}