import { pagemetasCurrent, pagemetasEdit } from "@/state/pagemetas";
import { buildPagemeta, PagemetaMetadata, Pagemeta } from "../../../../admin_cls_module/src";
import { AdminService } from "./AdminService";
import axios from "axios"
import { cloneDeep } from "lodash"
import { AreaConfig, AreaContent, Asset, BootstrapVersionEnum, HeadVersionEnum, PageConfigMetadata, PageContentMetadata, PageVersion, SkeletonVersionEnum, LangEnum, PageConfig, PageContent, buildPageVersion } from "../../../../page_cls_module/src";
import getEnvVariable from "@/logic/getEnvVariable";
import getUUID, { getShortUID } from "@/logic/getUUID";

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
            const { data } = await axios.get(url, { params, headers })
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
        const { data } = await axios.get(url, { params, headers });
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

    async createPageContent(content: PageContent) {
        const params = {

        }
        const headers = {

        }
        const body = content
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

    async createPagemeta(pagemeta: Pagemeta, lang: LangEnum) {
        const params = {
            lang,
        }
        const headers = {

        }
        const body = pagemeta
        const url = `${this.adminUrl}/pagemeta`
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

    getNewPagemeta(path: string, lang: LangEnum, versionTag: string): Pagemeta {
        const now = Date.now()
        const s3Path = `/${lang}${path}`
        const s3Link = `https://${getEnvVariable("VITE_APP_BUCKET_NAME")}.s3.amazonaws.com${s3Path}`;

        const isPublished = false

        const createdTimestamp = now
        const updatedTimestamp = now

        const metadata = new PagemetaMetadata(
            createdTimestamp,
            updatedTimestamp,
        )

        const pagemeta: Pagemeta = new Pagemeta(path, s3Path, s3Link, versionTag, isPublished, metadata)
        return pagemeta
    }

    getNewPageContent(): PageContent {
        const now = Date.now()
        const uuid: string = getUUID()
        const data: {
            [areaConfigId: string]: AreaContent;
        } = {}

        const createdTimestamp = now
        const updatedTimestamp = now
        const metadata = new PageContentMetadata(
            createdTimestamp,
            updatedTimestamp,
        )
        const obj: PageContent = new PageContent(
            uuid, data, metadata
        )
        return obj
    }

    getNewPageConfig(path: string, contentId: string): PageConfig {
        const now = Date.now()
        const uuid: string = getUUID()
        const lang = LangEnum.LT
        const pageName = path
        const pagePath = path
        const isIncludeBootstrap = false
        const headVersion = HeadVersionEnum.TEST_VERSION
        const templateVersion = SkeletonVersionEnum.TEST_VERSION
        const bootstrapVersion: BootstrapVersionEnum = BootstrapVersionEnum.BOOTSTRAP_5_0_2
        const areaConfigArr: AreaConfig[] = []
        const assets: Asset[] = []

        const createdTimestamp = now
        const updatedTimestamp = now
        const metadata = new PageConfigMetadata(
            createdTimestamp,
            updatedTimestamp,
        )
        const obj: PageConfig = new PageConfig(
            uuid, lang, pageName, pagePath, contentId, isIncludeBootstrap, headVersion, bootstrapVersion, templateVersion, areaConfigArr, assets, metadata
        )
        return obj
    }





} 