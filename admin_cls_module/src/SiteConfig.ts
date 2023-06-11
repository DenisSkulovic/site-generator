export const buildSiteConfig = (obj: any): SiteConfig => {
    return new SiteConfig(

    )
}

export class SiteConfig {
    clazz: string
    constructor(
    ) {
        this.clazz = this.constructor.name
    }
}
