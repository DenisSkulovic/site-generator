import type {PageConfig} from "../../../../../page_cls_module/src"
import {buildPageConfig} from "../../../../../page_cls_module/src"
import axios from "axios"

const getConfig = async (config_uuid: string): Promise<PageConfig> => {
    const VITE_APP_ADMIN_LAMBDA_URL = import.meta.env.VITE_APP_ADMIN_LAMBDA_URL
    if (!VITE_APP_ADMIN_LAMBDA_URL) throw new Error("VITE_APP_ADMIN_LAMBDA_URL cannot be undefined")
    const headers = {
        "Content-Type": "application/json"
    }
    const url = `${VITE_APP_ADMIN_LAMBDA_URL}/page-config/${config_uuid}`
    const {data} = await axios.get(
        url,
        {
            headers
        }
    )
    const pageConfig: PageConfig = buildPageConfig(data)
    return pageConfig
}

export default getConfig