export const buildProduct = (obj) => {
    return new Product(obj.uuid);
};
export class Product {
    constructor(uuid) {
        this.uuid = uuid;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=Product.js.map