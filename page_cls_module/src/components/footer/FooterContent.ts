import {FooterContentMetadata, buildFooterContentMetadata} from "./FooterContentMetadata"

export const buildFooterContent = (obj: any): FooterContent => {
    if (obj.clazz !== "FooterContent") throw new Error("clazz cannot be anything other than 'FooterContent'")
    const metadata: FooterContentMetadata = buildFooterContentMetadata(obj.metadata)
    const footerContent: FooterContent = new FooterContent(
        obj.uuid,
        metadata,
    )

    return footerContent
}

export class FooterContent {
    uuid: string
    metadata: FooterContentMetadata
    clazz: string
    constructor(
        uuid: string,
        metadata: FooterContentMetadata,
    ) {
        this.uuid = uuid
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}