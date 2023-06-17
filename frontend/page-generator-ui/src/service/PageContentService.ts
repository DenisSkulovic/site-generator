import axios from "axios"
import { reactive } from "vue"
import { AdminService } from "./AdminService"
import { PageContentMetadata, buildPageContent, type AreaContent, PageContent } from "../../../../page_cls_module/build_browser"
import { editPageContent, currentPageContent } from "@/state/pageContentState"
import getUUID from "@/utils/getUUID"
import _ from "lodash"

export type S3Path = string
export class PageContentService extends AdminService {
    bucketName: string
    pagePath: string
    constructor(adminUrl: string, bucketName: string, pagePath: string) {
        super(adminUrl)
        this.bucketName = bucketName
        this.pagePath = pagePath
    }

    async getContent(content_uuid: string): Promise<PageContent> {
        const headers = {
            "Content-Type": "application/json"
        }
        const url = `${this.adminUrl}/page-content/${content_uuid}`
        const { data } = await axios.get(
            url,
            {
                headers
            }
        )
        const pageContent: PageContent = buildPageContent(data)
        return pageContent
    }

    async putContent(pageContent: PageContent): Promise<PageContent> {
        const headers = {
            "Content-Type": "application/json"
        }
        const body: PageContent = pageContent
        const content_uuid: string = pageContent.uuid
        const url = `${this.adminUrl}/page-content/${content_uuid}`
        const { data } = await axios.put(
            url,
            body,
            {
                headers
            }
        )
        const respPageContent: PageContent = buildPageContent(data)
        return respPageContent
    }

    getNewPageContent(): PageContent {
        const uuid = getUUID()
        const data: {
            [areaConfigId: string]: AreaContent;
        } = {}
        const now: number = Date.now()
        const createdTimestamp = now
        const updatedTimestamp = now

        const metadata: PageContentMetadata = new PageContentMetadata(
            createdTimestamp,
            updatedTimestamp,
        )

        const obj: PageContent = reactive(new PageContent(
            uuid,
            data,
            metadata,
        ))

        return obj
    }

    resetPageContent() {
        editPageContent.value = _.cloneDeep(currentPageContent.value)
    }

    setPageContent(obj: PageContent) {
        currentPageContent.value = obj
        this.resetPageContent()
    }
}
