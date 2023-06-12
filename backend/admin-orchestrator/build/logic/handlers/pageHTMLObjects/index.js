"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePageHTMLObjectPut = exports.handlePageHTMLObjectPost = exports.handlePageHTMLObjectGetAll = exports.handlePageHTMLObjectGet = exports.handlePageHTMLObjectDelete = void 0;
const _repository_module_1 = require("@repository_module");
const _page_cls_module_1 = require("@page_cls_module");
const handlePageHTMLObjectDelete = async (event, env) => {
    const key = event.pathParameters?.key;
    if (!key)
        throw new Error("key is a mandatory query string param");
    const repo = new _repository_module_1.PageHTMLRepository();
    await repo.deleteItem(key);
};
exports.handlePageHTMLObjectDelete = handlePageHTMLObjectDelete;
const handlePageHTMLObjectGet = async (event, env) => {
    const key = event.pathParameters?.key;
    if (!key)
        throw new Error("key is a mandatory query string param");
    const repo = new _repository_module_1.PageHTMLRepository();
    const item = await repo.getItem(key);
    return item;
};
exports.handlePageHTMLObjectGet = handlePageHTMLObjectGet;
const handlePageHTMLObjectGetAll = async (event, env) => {
    const repo = new _repository_module_1.PageHTMLRepository();
    const items = await repo.getAllItems();
    return items;
};
exports.handlePageHTMLObjectGetAll = handlePageHTMLObjectGetAll;
const handlePageHTMLObjectPost = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const pageHTMLObject = (0, _page_cls_module_1.buildPageHTMLObject)(body);
    const repo = new _repository_module_1.PageHTMLRepository();
    await repo.putItem(pageHTMLObject);
};
exports.handlePageHTMLObjectPost = handlePageHTMLObjectPost;
const handlePageHTMLObjectPut = async (event, env) => {
    const body = JSON.parse(event.body || "{}");
    const pageHTMLObject = (0, _page_cls_module_1.buildPageHTMLObject)(body);
    const repo = new _repository_module_1.PageHTMLRepository();
    await repo.putItem(pageHTMLObject);
};
exports.handlePageHTMLObjectPut = handlePageHTMLObjectPut;
//# sourceMappingURL=index.js.map