"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageGenerator = void 0;
const axios_1 = __importDefault(require("axios"));
const src_1 = require("../../../../page_cls_module/src");
class PageGenerator {
    constructor(env) {
        this.baseUrl = PageGenerator.getPageGeneratorUrl(env);
    }
    async generateHeader(content, config) {
        const url = `${this.baseUrl}/generate-header`;
        const headers = {
            "Content-Type": "application/json"
        };
        const params = {};
        const body = new src_1.GenerateHeaderRequest(content, config);
        const { data } = await axios_1.default.post(url, body, {
            params,
            headers,
        });
        return data;
    }
    async generateFooter(content, config) {
        const url = `${this.baseUrl}/generate-footer`;
        const headers = {
            "Content-Type": "application/json"
        };
        const params = {};
        const body = new src_1.GenerateFooterRequest(content, config);
        const { data } = await axios_1.default.post(url, body, {
            params,
            headers,
        });
        return data;
    }
    async generatePage(content, config) {
        const url = `${this.baseUrl}/generate-page`;
        const headers = {
            "Content-Type": "application/json"
        };
        const params = {};
        const body = new src_1.GeneratePageRequest(content, config);
        const { data } = await axios_1.default.post(url, body, {
            params,
            headers,
        });
        return data;
    }
    static getPageGeneratorUrl(env) {
        let baseUrl;
        if (env === "prod") {
            baseUrl = process.env.PAGE_GENERATOR_PROD;
            if (!baseUrl)
                throw new Error("PAGE_GENERATOR_PROD is a mandatory env param");
        }
        else {
            baseUrl = process.env.PAGE_GENERATOR_DEV;
            if (!baseUrl)
                throw new Error("PAGE_GENERATOR_DEV is a mandatory env param");
        }
        return baseUrl;
    }
}
exports.PageGenerator = PageGenerator;
//# sourceMappingURL=PageGenerator.js.map