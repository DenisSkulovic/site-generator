export const buildPageVersion = (obj: any): PageVersion => {
    if (!obj.tag) throw new Error("tag cannot be undefined")
    if (!obj.pagePath) throw new Error("pagePath cannot be undefined")
    if (!obj.configUUID) throw new Error("configUUID cannot be undefined")
    if (!obj.contentUUID) throw new Error("contentUUID cannot be undefined")
    if (!obj.createdTimestamp) throw new Error("createdTimestamp cannot be undefined")
    if (!obj.updatedTimestamp) throw new Error("updatedTimestamp cannot be undefined")

    const pageVersion: PageVersion = new PageVersion(
        obj.tag,
        obj.pagePath,
        obj.configUUID,
        obj.contentUUID,
        obj.createdTimestamp,
    )
    return pageVersion
}

export class PageVersion {
    tag: string
    pagePath: string
    configUUID: string
    contentUUID: string
    createdTimestamp: number
    clazz: string
    constructor(
        tag: string,
        pagePath: string,
        configUUID: string,
        contentUUID: string,
        createdTimestamp: number,

    ) {
        this.tag = tag
        this.pagePath = pagePath
        this.configUUID = configUUID
        this.contentUUID = contentUUID
        this.createdTimestamp = createdTimestamp
        this.clazz = this.constructor.name
    }
}