import { pagemetasCurrent, pagemetasEdit } from "@/state/pagemetas";
import { buildPagemeta, type Pagemeta } from "../../../../admin_cls_module/src";
import { AdminService } from "./AdminService";
import axios from "axios"
import { cloneDeep } from "lodash"
import type { LangEnum, PageConfig, PageContent } from "../../../../page_cls_module/src";

export class PagemetaService extends AdminService {
    constructor(adminUrl: string) {
        super(adminUrl)
    }

    async fetchPagemeta(path: string, lang: LangEnum): Promise<Pagemeta | undefined> {
        const url = `${this.adminUrl}/pagemeta`
        const params = {
            path,
            lang,
        }
        const headers = {

        }
        try {
            const {data} = await axios.get(url, {params, headers})
            if (data) return buildPagemeta(data)
        } catch (error: any) {
            console.error(error)
        }
    }

    async fetchPagemetaAll(lang: LangEnum): Promise<Pagemeta[]> {
        const params = {
            lang
        }
        const headers = {

        }
        const url = `${this.adminUrl}/pagemeta/all`;
        const { data } = await axios.get(url, {params, headers});
        // Make sure data is an array before mapping over it
        if (!Array.isArray(data)) {
            throw new Error("Invalid data received from the server. Expected an array.");
        }
        // Build Pagemeta for each item in the array
        const pagemetas: Pagemeta[] = data.map(buildPagemeta);
        return pagemetas;
    }

    async getPagemetaAll(lang: LangEnum): Promise<void> {
        pagemetasCurrent.value = await this.fetchPagemetaAll(lang)
        pagemetasEdit.value = cloneDeep(pagemetasCurrent.value)
    }

    async publishPage(pagemeta: Pagemeta): Promise<void> {
        const body = pagemeta
        const params = {

        }
        const headers = {

        }
        const url = `${this.adminUrl}/publish-page`
        const {data} = await axios.post(
            url,
            body,
            {
                params,
                headers,
            }
        )
        return data
    }

    async unpublishPage(pagemeta: Pagemeta): Promise<void> {
        const body = pagemeta
        const params = {
            
        }
        const headers = {

        }
        const url = `${this.adminUrl}/unpublish-page`
        const {data} = await axios.post(
            url,
            body,
            {
                params,
                headers,
            }
        )
        return data
    }

    async regenerateAll(): Promise<void> {
        const params = {

        }
        const headers = {

        }
        const url = `${this.adminUrl}/regenerate-all`
        const {data} = await axios.get(
            url,
            {
                params,
                headers,
            }
        )
        return data
    }

    async checkPageExists(path: string, lang: LangEnum): Promise<boolean> {
        let flag: boolean = false

        try {
            const pagemeta: Pagemeta | undefined = await this.fetchPagemeta(path, lang)
            if (!!pagemeta) flag = true
        } catch (err) {
            flag = false
        }
        return flag;
    }

    async createPageConfig(config: PageConfig) {
        const params = {

        }
        const headers = {

        }
        const body = config
        const url = `${this.adminUrl}/page-config`
        const {data} = await axios.post(
            url,
            body,
            {
                params,
                headers,
            }
        )
        return data
    }

    async createPageContent(content: PageContent) {
        const params = {

        }
        const headers = {

        }
        const body = content
        const url = `${this.adminUrl}/page-content`
        const {data} = await axios.post(
            url,
            body,
            {
                params,
                headers,
            }
        )
        return data
    }

    async createPagemeta(pagemeta: Pagemeta, lang: LangEnum) {
        const params = {
            lang,
        }
        const headers = {

        }
        const body = pagemeta
        const url = `${this.adminUrl}/pagemeta`
        const {data} = await axios.post(
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