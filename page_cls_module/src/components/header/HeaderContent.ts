import {HeaderContentMetadata, buildHeaderContentMetadata} from "./HeaderContentMetadata"
import {NavItem, buildNavItem} from "./NavItem"

export const buildHeaderContent = (obj: any): HeaderContent => {
    const metadata: HeaderContentMetadata = buildHeaderContentMetadata(obj.metadata)
    if (obj.clazz !== "HeaderContent") throw new Error("clazz cannot be anything other than 'HeaderContent'")
    const navItems: Array<NavItem> = obj.navItems.map((obj: any) => {
        return buildNavItem(obj)
    })

    const headerContent: HeaderContent = new HeaderContent(
        obj.uuid,
        obj.logoUrl,
        obj.logoAlt,
        navItems,
        metadata,
    )
    return headerContent
}

export class HeaderContent {
    uuid: string
    logoUrl: string
    logoAlt: string
    navItems: NavItem[]
    metadata: HeaderContentMetadata
    clazz: string
    constructor(
        uuid: string,
        logoUrl: string,
        logoAlt: string,
        navItems: NavItem[],
        metadata: HeaderContentMetadata,
    ) {
        this.uuid = uuid
        this.logoUrl = logoUrl
        this.logoAlt = logoAlt
        this.navItems = navItems
        this.metadata = metadata
        this.clazz = this.constructor.name
    }
}