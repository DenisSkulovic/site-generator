import axios from "axios"
import { type Pagemeta, buildPagemeta } from "../../../../admin_cls_module/build_browser"
import type { LangEnum } from "../../../../page_cls_module/build_browser"
import { AdminService } from "./AdminService"

export class PublishingService extends AdminService {
    constructor(adminUrl: string) {
        super(adminUrl)
    }

    async publishPage(pagePath: string, versionTag: string, lang: LangEnum): Promise<Pagemeta> {
        const headers = {
            "Content-Type": "application/json"
        }
        const params = {
            pagePath,
            versionTag,
            lang,
        }
        const url = `${this.adminUrl}/publishing/publish-page`
        const { data } = await axios.get(
            url,
            {
                headers,
                params,
            }
        )
        const pagemeta: Pagemeta = buildPagemeta(data)
        return pagemeta
    }

    async unpublishPage(pagePath: string, lang: LangEnum): Promise<Pagemeta> {
        const headers = {
            "Content-Type": "application/json"
        }
        const params = {
            pagePath,
            lang,
        }
        const url = `${this.adminUrl}/publishing/unpublish-page`
        const { data } = await axios.get(
            url,
            {
                headers,
                params,
            }
        )
        const pagemeta: Pagemeta = buildPagemeta(data)
        return pagemeta
    }

}