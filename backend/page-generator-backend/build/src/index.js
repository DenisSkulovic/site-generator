"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const _page_cls_module_1 = require("@page_cls_module");
const dotenv = __importStar(require("dotenv"));
const handleError_1 = __importDefault(require("./logic/handleError"));
const Response_1 = __importDefault(require("./classes/Response"));
const handleGenerateHeader_1 = __importDefault(require("./logic/handlers/handleGenerateHeader"));
const handleGenerateFooter_1 = __importDefault(require("./logic/handlers/handleGenerateFooter"));
const handleGeneratePage_1 = __importDefault(require("./logic/handlers/handleGeneratePage"));
const handleGenerateArea_1 = __importDefault(require("./logic/handlers/handleGenerateArea"));
const handleGenerateBlock_1 = __importDefault(require("./logic/handlers/handleGenerateBlock"));
dotenv.config();
/**
 *
 * @param event
 * @param context
 * @param callback
 * @returns
 */
const handler = async (event, context, callback) => {
    if (process.env.NODE_ENV === "production")
        console.log(`event :>> `, event);
    let body;
    const path = `${event.httpMethod} /page-generator${event.resource}`;
    console.log(`path`, path);
    try {
        switch (path) {
            /**
             * GENERATE HEADER
            */
            case ("POST /generate-header"):
            case ("POST /page-generator/generate-header"): {
                const requestBody = JSON.parse(event.body || "{}");
                const request = (0, _page_cls_module_1.buildGenerateHeaderRequest)(requestBody);
                const res = await (0, handleGenerateHeader_1.default)(request);
                body = res;
                break;
            }
            /**
             * GENERATE FOOTER
             */
            case ("POST /generate-footer"):
            case ("POST /page-generator/generate-footer"): {
                const requestBody = JSON.parse(event.body || "{}");
                const request = (0, _page_cls_module_1.buildGenerateFooterRequest)(requestBody);
                const res = await (0, handleGenerateFooter_1.default)(request);
                body = res;
                break;
            }
            /**
             * GENERATE PAGE
             */
            case ("POST /generate-page"):
            case ("POST /page-generator/generate-page"): {
                const requestBody = JSON.parse(event.body || "{}");
                const request = (0, _page_cls_module_1.buildGeneratePageRequest)(requestBody);
                const res = await (0, handleGeneratePage_1.default)(request);
                body = res;
                break;
            }
            /**
             * GENERATE AREA
             */
            case ("POST /generate-area"):
            case ("POST /page-generator/generate-area"): {
                const requestBody = JSON.parse(event.body || "{}");
                const request = (0, _page_cls_module_1.buildGenerateAreaRequest)(requestBody);
                const res = await (0, handleGenerateArea_1.default)(request);
                body = res;
                break;
            }
            /**
             * GENERATE BLOCK
             */
            case ("POST /generate-block"):
            case ("POST /page-generator/generate-block"): {
                const requestBody = JSON.parse(event.body || "{}");
                const request = (0, _page_cls_module_1.buildGenerateBlockRequest)(requestBody);
                const res = await (0, handleGenerateBlock_1.default)(request);
                body = res;
                break;
            }
            default: {
                throw new TypeError(`Unknown event routeKey: ${event.httpMethod} ${event.resource || event.path}`);
            }
        }
        const response = new Response_1.default(200, JSON.stringify(body));
        console.log(`RESPONSE`, response);
        return response;
    }
    catch (err) {
        console.log(`err`, err);
        return await (0, handleError_1.default)(err);
    }
};
exports.handler = handler;
//# sourceMappingURL=index.js.map