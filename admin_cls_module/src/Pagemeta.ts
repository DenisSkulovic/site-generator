import { PagemetaMetadata, buildPagemetaMetadata } from "./PagemetaMetadata"

export const buildPagemeta = (obj: any): Pagemeta => {
    const metadata = new Pagemeta(
        obj.path,
        obj.s3Path,
        obj.s3Link,
        obj.versionTag,
        obj.isPublished,
        buildPagemetaMetadata(obj.metadata),
    )
    return metadata
}

export class Pagemeta {
    path: string // primary key
    s3Path: string
    s3Link: string
    versionTag: string
    isPublished: boolean
    metadata: PagemetaMetadata
    clazz: string
    constructor(
        path: string,
        s3Path: string,
        s3Link: string,
        versionTag: string,
        isPublished: boolean,
        metadata: PagemetaMetadata,
    ) {
        this.path = path
        this.s3Path = s3Path
        this.s3Link = s3Link
        this.versionTag = versionTag
        this.isPublished = isPublished
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}