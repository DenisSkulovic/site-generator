import type {PageConfig} from "../../../../../page_cls_module/src"
import {buildPageConfig} from "../../../../../page_cls_module/src"
import axios from "axios"

const putConfig = async (pageConfig: PageConfig): Promise<PageConfig> => {
    const VITE_APP_ADMIN_LAMBDA_URL = import.meta.env.VITE_APP_ADMIN_LAMBDA_URL
    if (!VITE_APP_ADMIN_LAMBDA_URL) throw new Error("VITE_APP_ADMIN_LAMBDA_URL cannot be undefined")
    const headers = {
        "Content-Type": "application/json"
    }
    const body: PageConfig = pageConfig
    const config_uuid: string = pageConfig.uuid
    const url = `${VITE_APP_ADMIN_LAMBDA_URL}/admin/page-config/${config_uuid}`
    const {data} = await axios.put(
        url,
        body,
        {
            headers
        }
    )
    const respPageConfig: PageConfig = buildPageConfig(data)
    return respPageConfig
}

export default putConfig