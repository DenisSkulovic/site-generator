import { FooterContentMetadata, buildFooterContentMetadata } from "./FooterContentMetadata"

export const buildFooterContent = (obj: any): FooterContent => {
    if (obj.clazz !== "FooterContent") throw new Error("clazz cannot be anything other than 'FooterContent'")
    const metadata: FooterContentMetadata = buildFooterContentMetadata(obj.metadata)
    const footerContent: FooterContent = new FooterContent(
        obj.uuid,
        obj.email,
        metadata,
    )

    return footerContent
}

export class FooterContent {
    uuid: string
    email: string
    metadata: FooterContentMetadata
    clazz: string
    constructor(
        uuid: string,
        email: string,
        metadata: FooterContentMetadata,
    ) {
        this.uuid = uuid
        this.email = email
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}