"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.buildProduct = void 0;
const buildProduct = (obj) => {
    return new Product(obj.uuid);
};
exports.buildProduct = buildProduct;
class Product {
    constructor(uuid) {
        this.uuid = uuid;
        this.clazz = this.constructor.name;
    }
}
exports.Product = Product;
//# sourceMappingURL=Product.js.map