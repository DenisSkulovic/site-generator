"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageVersionRepository = void 0;
const Repository_1 = require("./Repository");
const TableEnum_1 = require("./TableEnum");
const page_cls_module_1 = require("../../../page_cls_module");
class PageVersionRepository extends Repository_1.Repository {
    constructor() {
        const tableName = TableEnum_1.TableEnum.PAGE_VERSION;
        const region = process.env.REGION;
        if (!region)
            throw new Error("REGION is a mandatory env param");
        super(tableName, region);
    }
    async getPageVersion(tag, pagePath) {
        const item = await this.getItem({ tag: { S: tag }, pagePath: { S: pagePath } });
        return (0, page_cls_module_1.buildPageVersion)(item);
    }
    async getPageVersionsForPagePath(pagePath) {
        const items = await this.queryItems("pagePath", pagePath);
        return items.map((item) => (0, page_cls_module_1.buildPageVersion)(item));
    }
}
exports.PageVersionRepository = PageVersionRepository;
//# sourceMappingURL=PageVersionRepository.js.map