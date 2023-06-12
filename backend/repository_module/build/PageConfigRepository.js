"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageConfigRepository = void 0;
const Repository_1 = require("./Repository");
const TableEnum_1 = require("./TableEnum");
class PageConfigRepository extends Repository_1.Repository {
    constructor() {
        const tableName = TableEnum_1.TableEnum.PAGE_CONFIG;
        const region = process.env.REGION;
        if (!region)
            throw new Error("REGION is a mandatory env param");
        super(tableName, region);
    }
}
exports.PageConfigRepository = PageConfigRepository;
//# sourceMappingURL=PageConfigRepository.js.map