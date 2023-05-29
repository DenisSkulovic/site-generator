"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = __importDefault(require("../classes/Response"));
/**
 *
 * @param err
 * @returns
 */
const handleError = async (err) => {
    console.error(`my name is steve`, JSON.stringify(err).slice(0, 2000));
    if (err instanceof TypeError || err instanceof SyntaxError) {
        return new Response_1.default(400, JSON.stringify({
            message: err.message
        }));
    }
    else {
        return new Response_1.default(500, JSON.stringify({
            message: err.message
        }));
    }
};
exports.default = handleError;
//# sourceMappingURL=handleError.js.map