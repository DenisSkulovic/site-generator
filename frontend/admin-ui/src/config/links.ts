import {PagePathEnum} from "../router"

export class Link {
    label: string
    url: PagePathEnum | string
    constructor(
        label: string,
        url: PagePathEnum | string,
    ) {
        this.label = label
        this.url = url
    }
}

export const links = [
    new Link("home", PagePathEnum.HOME),
    new Link("pages", PagePathEnum.PAGES),
    new Link("header_footer_manager", PagePathEnum.HEADER_FOOTER_MANAGER),
]