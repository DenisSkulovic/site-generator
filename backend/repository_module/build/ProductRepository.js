"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const src_1 = require("../../../page_cls_module/src");
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
    async getProductsAll() {
        const items = await this.getAllItems();
        return items.map((item) => (0, src_1.buildProduct)(item));
    }
    async getProduct(uuid) {
        const item = await this.getItem({ uuid: { S: uuid } });
        return (0, src_1.buildProduct)(item);
    }
    async deleteProduct(uuid) {
        await this.deleteItem({ uuid: { S: uuid } });
    }
    async putProducts(items) {
        await this.putItems(items);
    }
    async putProduct(item) {
        await this.putItem(item);
    }
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=ProductRepository.js.map