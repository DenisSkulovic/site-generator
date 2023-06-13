import { buildHeaderContentMetadata } from "./HeaderContentMetadata";
import { buildNavItem } from "./NavItem";
export const buildHeaderContent = (obj) => {
    const metadata = buildHeaderContentMetadata(obj.metadata);
    if (obj.clazz !== "HeaderContent")
        throw new Error("clazz cannot be anything other than 'HeaderContent'");
    const navItems = obj.navItems.map((obj) => {
        return buildNavItem(obj);
    });
    const headerContent = new HeaderContent(obj.uuid, obj.logoUrl, obj.logoAlt, navItems, metadata);
    return headerContent;
};
export class HeaderContent {
    constructor(uuid, logoUrl, logoAlt, navItems, metadata) {
        this.uuid = uuid;
        this.logoUrl = logoUrl;
        this.logoAlt = logoAlt;
        this.navItems = navItems;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=HeaderContent.js.map