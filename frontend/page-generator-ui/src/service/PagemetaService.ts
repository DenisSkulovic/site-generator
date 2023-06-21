import axios from "axios"
import { type Pagemeta, buildPagemeta } from "../../../../admin_cls_module/build_browser"
import type { LangEnum } from "../../../../page_cls_module/build_browser"
import { AdminService } from "./AdminService"
import pagemeta from "@/state/pagemeta"

export class PagemetaService extends AdminService {
    constructor(adminUrl: string) {
        super(adminUrl)
    }

    async fetchPagemeta(path: string, lang: LangEnum): Promise<Pagemeta> {
        const headers = {
            "Content-Type": "application/json"
        }
        const params = {
            path,
            lang,
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

    async getPagemeta(path: string, lang: LangEnum): Promise<Pagemeta> {
        const pagemetaObj = await this.fetchPagemeta(path, lang)
        pagemeta.value = pagemetaObj
        return pagemetaObj
    }
}