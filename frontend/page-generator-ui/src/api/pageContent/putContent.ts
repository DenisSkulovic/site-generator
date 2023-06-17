import type {PageContent} from "../../../../../page_cls_module/src"
import {buildPageContent} from "../../../../../page_cls_module/src"
import axios from "axios"

const putContent = async (pageContent: PageContent): Promise<PageContent> => {
    const VITE_APP_ADMIN_LAMBDA_URL = import.meta.env.VITE_APP_ADMIN_LAMBDA_URL
    if (!VITE_APP_ADMIN_LAMBDA_URL) throw new Error("VITE_APP_ADMIN_LAMBDA_URL cannot be undefined")
    const headers = {
        "Content-Type": "application/json"
    }
    const body: PageContent = pageContent
    const content_uuid: string = pageContent.uuid
    const url = `${VITE_APP_ADMIN_LAMBDA_URL}/page-content/${content_uuid}`
    const {data} = await axios.put(
        url,
        body,
        {
            headers
        }
    )
    const respPageContent: PageContent = buildPageContent(data)
    return respPageContent
}

export default putContent