"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const Repository_1 = require("./Repository");
const TableEnum_1 = require("./TableEnum");
class ProductRepository extends Repository_1.Repository {
    constructor() {
        const tableName = TableEnum_1.TableEnum.PRODUCT;
        const region = process.env.REGION;
        if (!region)
            throw new Error("REGION is a mandatory env param");
        super(tableName, region);
    }
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=ProductRepository.js.map