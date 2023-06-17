import { LangEnum } from "../../../../../page_cls_module/build_browser"
import getQueryParams from "../../utils/getQueryParams"

export type UrlParams = {
    path: string
    lang: LangEnum
}

const readUrl = (): UrlParams => {
    const query: {[key: string]: string} = getQueryParams()
    const path: string | undefined = query.path
    const lang: string | undefined = query.lang
    if (!path) throw new Error("path is a mandatory query param")
    if (!lang) throw new Error("lang is a mandatory query param")
    if (!Object.values(LangEnum).includes(lang as LangEnum)) throw new Error("lang is not recognized")
    return {
        path,
        lang: lang as LangEnum,
    }
}

export default readUrl