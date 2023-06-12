"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = __importDefault(require("../classes/Response"));
const handleError = async (err) => {
    console.error("Error:", err);
    let statusCode = 500;
    let message = "Internal Server Error";
    if (err instanceof TypeError || err instanceof SyntaxError) {
        statusCode = 400;
        message = err.message;
    }
    const responseBody = JSON.stringify({ message });
    return new Response_1.default(statusCode, responseBody);
};
exports.default = handleError;
//# sourceMappingURL=handleError.js.map