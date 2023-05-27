import { FooterConfigMetadata, FooterTemplateVersionEnum, BootstrapVersionEnum } from "../../"
import {buildFooterConfigMetadata} from "./FooterConfigMetadata"

export const buildFooterConfig = (obj: any): FooterConfig => {
    if (!obj.uuid) throw new Error("uuid cannot be undefined")
    if (!obj.metadata) throw new Error("metadata cannot be undefined")
    const metadata = buildFooterConfigMetadata(obj.metadata)
    if (obj.clazz !== "FooterConfig") throw new Error("clazz cannot be anything other than 'FooterConfig'")
    if (!Object.values(FooterTemplateVersionEnum).includes(obj.templateVersion)) throw new Error("unrecognized templateVersion")
    if (!Object.values(BootstrapVersionEnum).includes(obj.bootstrapVersion)) throw new Error("unrecognized bootstrapVersion")

    const footerConfig: FooterConfig = new FooterConfig(
        obj.uuid,
        obj.templateVersion,
        obj.bootstrapVersion,
        metadata,
    )
    return footerConfig
}

export class FooterConfig {
    uuid: string
    templateVersion: FooterTemplateVersionEnum
    bootstrapVersion: BootstrapVersionEnum
    metadata: FooterConfigMetadata
    clazz: string
    constructor(
        uuid: string,
        templateVersion: FooterTemplateVersionEnum,
        bootstrapVersion: BootstrapVersionEnum,
        metadata: FooterConfigMetadata,
    ) {
        this.uuid = uuid
        this.templateVersion = templateVersion
        this.bootstrapVersion = bootstrapVersion
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}