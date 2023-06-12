"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleProductPutAll = exports.handleProductPut = exports.handleProductPost = exports.handleProductGetAll = exports.handleProductGet = exports.handleProductDelete = void 0;
const _repository_module_1 = require("@repository_module");
const _page_cls_module_1 = require("@page_cls_module");
const handleProductDelete = async (event, env) => {
    const uuid = event.pathParameters?.uuid;
    if (!uuid)
        throw new Error("uuid is a mandatory query string param");
    const repo = new _repository_module_1.ProductRepository();
    await repo.deleteItem(uuid);
};
exports.handleProductDelete = handleProductDelete;
const handleProductGet = async (event, env) => {
    const uuid = event.pathParameters?.uuid;
    if (!uuid)
        throw new Error("uuid is a mandatory query string param");
    const repo = new _repository_module_1.ProductRepository();
    const product = await repo.getItem(uuid);
    return product;
};
exports.handleProductGet = handleProductGet;
const handleProductGetAll = async (event, env) => {
    const repo = new _repository_module_1.ProductRepository();
    const products = await repo.getAllItems();
    return products;
};
exports.handleProductGetAll = handleProductGetAll;
const handleProductPost = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const item = (0, _page_cls_module_1.buildProduct)(body);
    const repo = new _repository_module_1.ProductRepository();
    await repo.putItem(item);
};
exports.handleProductPost = handleProductPost;
const handleProductPut = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const item = (0, _page_cls_module_1.buildProduct)(body);
    const repo = new _repository_module_1.ProductRepository();
    await repo.putItem(item);
};
exports.handleProductPut = handleProductPut;
const handleProductPutAll = async (event, env) => {
    const body = JSON.parse(event.body || "[]");
    const products = body.map((productData) => (0, _page_cls_module_1.buildProduct)(productData));
    const repo = new _repository_module_1.ProductRepository();
    await repo.putItems(products);
};
exports.handleProductPutAll = handleProductPutAll;
//# sourceMappingURL=index.js.map