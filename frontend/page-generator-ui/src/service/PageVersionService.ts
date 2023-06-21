import axios from "axios"
import { PageVersion, type LangEnum } from "../../../../page_cls_module/build_browser"
import { AdminService } from "./AdminService"
import pageVersion from "@/state/pageVersion"
import { getShortUID } from "@/utils/getUUID"
import { buildPageVersion } from "../../../../page_cls_module/build_browser/components/page/version/PageVersion"


export class PageVersionService extends AdminService {
    pagePath: string
    constructor(adminUrl: string, pagePath: string) {
        super(adminUrl)
        this.pagePath = pagePath
    }

    async fetchPageVersion(tag: string): Promise<PageVersion> {
        const headers = {
            "Content-Type": "application/json"
        }
        const params = {
            tag
        }
        const url = `${this.adminUrl}/page-version`
        const { data } = await axios.get(
            url,
            {
                headers,
                params,
            }
        )
        const pageVersion: PageVersion = buildPageVersion(data)
        return pageVersion
    }

    async getPageVersion(tag: string): Promise<PageVersion> {
        const pageVersionObj = await this.fetchPageVersion(tag)
        this.setPageContent(pageVersionObj)
        return pageVersionObj
    }

    async createPageVersion(pageVersion: PageVersion): Promise<void> {
        const headers = {
            "Content-Type": "application/json"
        }
        const params = {
            
        }
        const body = pageVersion
        const url = `${this.adminUrl}/page-version`
        await axios.post(
            url,
            body,
            {
                headers,
                params,
            }
        )
    }

    async checkIsPageVersionExists(tag: string): Promise<boolean> {
        const headers = {
            "Content-Type": "application/json"
        }
        const params = {
            tag,
        }
        const url = `${this.adminUrl}/page-version`
        const { data } = await axios.get(
            url,
            {
                headers,
                params,
            }
        )
        return !!data
    }

    setPageVersion(obj: PageVersion) {
        pageVersion.value = obj
    }

    getNewPageVersion(tagName: string, pagePath: string, configUUID: string, contentUUID: string) {
        const uid = getShortUID()
        const tag = `${tagName}-${uid}`
        const createdTimestamp = Date.now()
        const pageVersion = new PageVersion(
            tag,
            pagePath,
            configUUID,
            contentUUID,
            createdTimestamp,
        )
        return pageVersion
    }
}