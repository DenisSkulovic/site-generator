import type {PageContent} from "../../../../../page_cls_module"
import {buildPageContent} from "../../../../../page_cls_module"
import axios from "axios"

const getContent = async (content_uuid: string): Promise<PageContent> => {
    const VITE_APP_ADMIN_LAMBDA_URL = import.meta.env.VITE_APP_ADMIN_LAMBDA_URL
    if (!VITE_APP_ADMIN_LAMBDA_URL) throw new Error("VITE_APP_ADMIN_LAMBDA_URL cannot be undefined")
    const headers = {
        "Content-Type": "application/json"
    }
    const url = `${VITE_APP_ADMIN_LAMBDA_URL}/page-content/${content_uuid}`
    const {data} = await axios.get(
        url,
        {
            headers
        }
    )
    const pageContent: PageContent = buildPageContent(data)
    return pageContent
}

export default getContent