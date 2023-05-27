export const buildNavItem = (obj: any): NavItem => {
    if (!obj.label) throw new Error("NavItem label cannot be undefined")
    if (!obj.url) throw new Error("NavItem url cannot be undefined")
    if (obj.clazz !== "NavItem") throw new Error("clazz cannot be anything other than 'NavItem'")
    const navItem: NavItem = new NavItem(
        obj.label,
        obj.url,
    )
    return navItem
}

export class NavItem {
    label: string
    url: string
    clazz: string
    constructor(
        label: string,
        url: string,
    ) {
        this.label = label
        this.url = url
        this.clazz = this.constructor.name
    }
}