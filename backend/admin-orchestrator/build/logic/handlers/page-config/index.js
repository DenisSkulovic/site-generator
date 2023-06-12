"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePageConfigPut = exports.handlePageConfigPost = exports.handlePageConfigGet = exports.handlePageConfigDelete = void 0;
const _repository_module_1 = require("@repository_module");
const _page_cls_module_1 = require("@page_cls_module");
const handlePageConfigDelete = async (event, env) => {
    const key = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }
    const repo = new _repository_module_1.PageConfigRepository();
    await repo.deleteItem(key);
};
exports.handlePageConfigDelete = handlePageConfigDelete;
const handlePageConfigGet = async (event, env) => {
    const key = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }
    const repo = new _repository_module_1.PageConfigRepository();
    const item = await repo.getItem(key);
    return item;
};
exports.handlePageConfigGet = handlePageConfigGet;
const handlePageConfigPost = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const item = (0, _page_cls_module_1.buildPageConfig)(body);
    const repo = new _repository_module_1.PageConfigRepository();
    await repo.putItem(item);
};
exports.handlePageConfigPost = handlePageConfigPost;
const handlePageConfigPut = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const item = (0, _page_cls_module_1.buildPageConfig)(body);
    const repo = new _repository_module_1.PageConfigRepository();
    await repo.putItem(item);
};
exports.handlePageConfigPut = handlePageConfigPut;
//# sourceMappingURL=index.js.map