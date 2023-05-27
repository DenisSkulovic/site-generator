import getQueryParams from "../../utils/getQueryParams"

export type UrlParams = {
    page_config_uuid?: string
    page_content_uuid?: string
    page_html_object_uuid?: string
    page_url?: string
}

const readUrl = (): UrlParams => {
    const query: {[key: string]: string} = getQueryParams()
    const page_config_uuid: string | undefined = query.page_config_uuid
    const page_content_uuid: string | undefined = query.page_content_uuid
    const page_html_object_uuid: string | undefined = query.page_html_object_uuid
    const page_url: string | undefined = query.page_url
    return {
        page_config_uuid,
        page_content_uuid,
        page_html_object_uuid,
        page_url,
    }
}

export default readUrl