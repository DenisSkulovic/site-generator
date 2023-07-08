"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagemetaRepository = void 0;
const Repository_1 = require("./Repository");
class PagemetaRepository extends Repository_1.Repository {
    constructor(tableName) {
        const region = process.env.REGION;
        if (!region)
            throw new Error("REGION is a mandatory env param");
        super(tableName, region);
    }
    async getPagemeta(path) {
        const item = this.getItem({ path: { S: path } });
        return item;
    }
    async savePagemeta(pagemeta) {
        const item = this.putItem(pagemeta);
        return item;
    }
    async deletePagemeta(pagemeta) {
        const item = this.putItem(pagemeta);
        return item;
    }
}
exports.PagemetaRepository = PagemetaRepository;
//# sourceMappingURL=PagemetaRepository.js.map