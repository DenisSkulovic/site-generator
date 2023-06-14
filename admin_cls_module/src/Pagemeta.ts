import { PagemetaMetadata, buildPagemetaMetadata } from "./PagemetaMetadata"

export const buildPagemeta = (obj: any): Pagemeta => {
    const metadata = new Pagemeta(
        obj.path,
        obj.s3Path,
        obj.s3Link,
        obj.contentUUID,
        obj.configUUID,
        buildPagemetaMetadata(obj.metadata),
    )
    return metadata
}

export class Pagemeta {
    path: string // primary key
    s3Path: string
    s3Link: string
    contentUUID: string
    configUUID: string
    metadata: PagemetaMetadata
    constructor(
        path: string,
        s3Path: string,
        s3Link: string,
        contentUUID: string,
        configUUID: string,
        metadata: PagemetaMetadata,
    ) {
        this.path = path
        this.s3Path = s3Path
        this.s3Link = s3Link
        this.contentUUID = contentUUID
        this.configUUID = configUUID
        this.metadata = metadata
    }
}