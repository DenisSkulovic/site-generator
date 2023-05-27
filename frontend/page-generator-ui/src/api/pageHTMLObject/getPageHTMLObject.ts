import type {PageHTMLObject} from "../../../../../page_cls_module/src"
import {buildPageHTMLObject} from "../../../../../page_cls_module/src"
import axios from "axios"

const getPageHTMLObject = async (page_html_object_uuid: string): Promise<PageHTMLObject> => {
    const VITE_APP_ADMIN_LAMBDA_URL = import.meta.env.VITE_APP_ADMIN_LAMBDA_URL
    if (!VITE_APP_ADMIN_LAMBDA_URL) throw new Error("VITE_APP_ADMIN_LAMBDA_URL cannot be undefined")
    const headers = {
        "Content-Type": "application/json"
    }
    const url = `${VITE_APP_ADMIN_LAMBDA_URL}/admin/page-html-object/${page_html_object_uuid}`
    const {data} = await axios.get(
        url,
        {
            headers
        }
    )
    const pageHTMLObject: PageHTMLObject = buildPageHTMLObject(data)
    return pageHTMLObject
}

export default getPageHTMLObject