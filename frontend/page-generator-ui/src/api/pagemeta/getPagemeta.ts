import type {LangEnum} from "../../../../../page_cls_module/src"
import type {Pagemeta} from "../../../../../admin_cls_module/src"
import {buildPagemeta} from "../../../../../admin_cls_module/src"
import axios from "axios"

const getPagemeta = async (path: string, lang: LangEnum): Promise<Pagemeta> => {
    const VITE_APP_ADMIN_LAMBDA_URL = import.meta.env.VITE_APP_ADMIN_LAMBDA_URL
    if (!VITE_APP_ADMIN_LAMBDA_URL) throw new Error("VITE_APP_ADMIN_LAMBDA_URL cannot be undefined")
    const headers = {
        "Content-Type": "application/json"
    }
    const params = {
        path,
        lang,
    }
    const url = `${VITE_APP_ADMIN_LAMBDA_URL}/pagemeta`
    const {data} = await axios.get(
        url,
        {
            headers,
            params,
        }
    )
    const pagemeta: Pagemeta = buildPagemeta(data)
    return pagemeta
}

export default getPagemeta