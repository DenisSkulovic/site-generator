import { Pagemeta, PagemetaMetadata } from "../../../../../admin_cls_module/src";
import type { LangEnum } from "../../../../../page_cls_module/src";

const getNewPagemeta = (path: string, lang: LangEnum, contentId: string, configId: string): Pagemeta => {
    const now = Date.now()
    const s3Path = `${lang}/${path}`   

    const s3Link = `https://${bucketName}.s3.amazonaws.com/${S3path}`;
    const isPublished = false

    const createdTimestamp = now
    const updatedTimestamp = now

    const metadata = new PagemetaMetadata(
        createdTimestamp,
        updatedTimestamp,
    )

    const pagemeta: Pagemeta = new Pagemeta(path, s3Path, s3Link, contentId, configId, isPublished, metadata)
    return pagemeta
}

export default getNewPagemeta