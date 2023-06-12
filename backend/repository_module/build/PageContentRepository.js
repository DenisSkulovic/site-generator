"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageContentRepository = void 0;
const Repository_1 = require("./Repository");
const TableEnum_1 = require("./TableEnum");
class PageContentRepository extends Repository_1.Repository {
    constructor() {
        const tableName = TableEnum_1.TableEnum.PAGE_CONTENT;
        const region = process.env.REGION;
        if (!region)
            throw new Error("REGION is a mandatory env param");
        super(tableName, region);
    }
}
exports.PageContentRepository = PageContentRepository;
//# sourceMappingURL=PageContentRepository.js.map