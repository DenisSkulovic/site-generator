"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const headers_1 = __importDefault(require("../config/headers"));
class Response {
    constructor(statusCode, body, additionalHeaders) {
        this.statusCode = statusCode;
        this.body = body;
        if (additionalHeaders) {
            this.headers = { ...headers_1.default, ...additionalHeaders };
        }
        else {
            this.headers = headers_1.default;
        }
    }
}
exports.default = Response;
//# sourceMappingURL=Response.js.map