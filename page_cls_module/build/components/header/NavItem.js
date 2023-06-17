"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavItem = exports.buildNavItem = void 0;
const buildNavItem = (obj) => {
    if (!obj.label)
        throw new Error("NavItem label cannot be undefined");
    if (!obj.url)
        throw new Error("NavItem url cannot be undefined");
    if (obj.clazz !== "NavItem")
        throw new Error("clazz cannot be anything other than 'NavItem'");
    const navItem = new NavItem(obj.label, obj.url);
    return navItem;
};
exports.buildNavItem = buildNavItem;
class NavItem {
    constructor(label, url) {
        this.label = label;
        this.url = url;
        this.clazz = this.constructor.name;
    }
}
exports.NavItem = NavItem;
//# sourceMappingURL=NavItem.js.map