"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderContent = exports.buildHeaderContent = void 0;
const HeaderContentMetadata_1 = require("./HeaderContentMetadata");
const NavItem_1 = require("./NavItem");
const buildHeaderContent = (obj) => {
    const metadata = (0, HeaderContentMetadata_1.buildHeaderContentMetadata)(obj.metadata);
    if (obj.clazz !== "HeaderContent")
        throw new Error("clazz cannot be anything other than 'HeaderContent'");
    const navItems = obj.navItems.map((obj) => {
        return (0, NavItem_1.buildNavItem)(obj);
    });
    const headerContent = new HeaderContent(obj.uuid, obj.logoUrl, obj.logoAlt, navItems, metadata);
    return headerContent;
};
exports.buildHeaderContent = buildHeaderContent;
class HeaderContent {
    constructor(uuid, logoUrl, logoAlt, navItems, metadata) {
        this.uuid = uuid;
        this.logoUrl = logoUrl;
        this.logoAlt = logoAlt;
        this.navItems = navItems;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
exports.HeaderContent = HeaderContent;
//# sourceMappingURL=HeaderContent.js.map