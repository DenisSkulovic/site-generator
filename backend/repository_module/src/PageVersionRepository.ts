import { Repository } from "./Repository"
import {TableEnum} from "./TableEnum"
import {PageVersion, buildPageVersion} from "../../../page_cls_module"

export class PageVersionRepository extends Repository {
    constructor() {
        const tableName = TableEnum.PAGE_VERSION
        const region = process.env.REGION
        if (!region) throw new Error("REGION is a mandatory env param")
        super(tableName, region)
    }

    async getPageVersion(versionTag: string, pagePath: string): Promise<PageVersion> {
        const item = await this.getItem({versionTag: {S: versionTag}, pagePath: {S: pagePath}})
        return buildPageVersion(item);
    }
    
    async getPageVersionsForPagePath(pagePath: string): Promise<PageVersion[]> {
        const items = await this.queryItems("pagePath", pagePath);
        return items.map((item) => buildPageVersion(item))
    }
}