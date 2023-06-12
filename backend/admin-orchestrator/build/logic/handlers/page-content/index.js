"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePageContentPut = exports.handlePageContentPost = exports.handlePageContentGet = exports.handlePageContentDelete = void 0;
const _repository_module_1 = require("@repository_module");
const _page_cls_module_1 = require("@page_cls_module");
const handlePageContentDelete = async (event, env) => {
    const key = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }
    const repo = new _repository_module_1.PageContentRepository();
    await repo.deleteItem(key);
};
exports.handlePageContentDelete = handlePageContentDelete;
const handlePageContentGet = async (event, env) => {
    const key = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }
    const repo = new _repository_module_1.PageContentRepository();
    const item = await repo.getItem(key);
    return item;
};
exports.handlePageContentGet = handlePageContentGet;
const handlePageContentPost = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const item = (0, _page_cls_module_1.buildPageContent)(body);
    const repo = new _repository_module_1.PageContentRepository();
    await repo.putItem(item);
};
exports.handlePageContentPost = handlePageContentPost;
const handlePageContentPut = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const item = (0, _page_cls_module_1.buildPageContent)(body);
    const repo = new _repository_module_1.PageContentRepository();
    await repo.putItem(item);
};
exports.handlePageContentPut = handlePageContentPut;
//# sourceMappingURL=index.js.map