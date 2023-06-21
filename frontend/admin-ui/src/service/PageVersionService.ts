import axios from "axios"
import { PageVersion, type LangEnum } from "../../../../page_cls_module/build_browser"
import { AdminService } from "./AdminService"
import { getShortUID } from "@/logic/getUUID"
import { buildPageVersion } from "../../../../page_cls_module/build_browser/components/page/version/PageVersion"


export class PageVersionService extends AdminService {
    pagePath: string
    constructor(adminUrl: string, pagePath: string) {
        super(adminUrl)
        this.pagePath = pagePath
    }

    async getPageVersions(pagePath: string): Promise<PageVersion[]> {
        const params = {
            pagePath,
        }
        const headers = {

        }
        const url = `${this.adminUrl}/page-versions-for-path`
        const { data } = await axios.get(
            url,
            {
                params,
                headers,
            }
        )
        if (!Array.isArray(data)) throw new Error("response must be an array")

        return data.map((item) => buildPageVersion(item))
    }

    getNewPageVersion(tagName: string, pagePath: string, configUUID: string, contentUUID: string): PageVersion {
        const now = Date.now()
        const tag = `${tagName}-${getShortUID()}`
        const createdTimestamp = now
        const obj: PageVersion = new PageVersion(
            tag,
            pagePath,
            configUUID,
            contentUUID,
            createdTimestamp,
        )
        return obj
    }

    async createPageVersion(version: PageVersion) {
        const params = {

        }
        const headers = {

        }
        const body = version
        const url = `${this.adminUrl}/page-content`
        const { data } = await axios.post(
            url,
            body,
            {
                params,
                headers,
            }
        )
        return data
    }
}