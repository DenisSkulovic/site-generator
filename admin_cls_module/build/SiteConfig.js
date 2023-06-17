"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteConfig = exports.buildSiteConfig = void 0;
const buildSiteConfig = (obj) => {
    return new SiteConfig();
};
exports.buildSiteConfig = buildSiteConfig;
class SiteConfig {
    constructor() {
        this.clazz = this.constructor.name;
    }
}
exports.SiteConfig = SiteConfig;
//# sourceMappingURL=SiteConfig.js.map