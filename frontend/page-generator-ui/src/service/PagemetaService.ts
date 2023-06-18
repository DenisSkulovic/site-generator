import axios from "axios"
import { type Pagemeta, buildPagemeta } from "../../../../admin_cls_module/build_browser"
import type { LangEnum } from "../../../../page_cls_module/build_browser"
import { AdminService } from "./AdminService"
import pagemeta from "@/state/pagemeta"

export class PagemetaService extends AdminService {
    pagePath: string
    lang: LangEnum | null
    constructor(adminUrl: string, pagePath: string, lang: LangEnum | null) {
        super(adminUrl)
        this.pagePath = pagePath
        this.lang = lang
    }

    async fetchPagemeta(): Promise<Pagemeta> {
        if (!this.lang) throw new Error("this.lang cannot be null")
        const headers = {
            "Content-Type": "application/json"
        }
        const params = {
            path: this.pagePath,
            lang: this.lang,
        }
        const url = `${this.adminUrl}/pagemeta`
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

    async getPagemeta(): Promise<void> {
        const pagemetaObj = await this.fetchPagemeta()
        pagemeta.value = pagemetaObj
    }
}