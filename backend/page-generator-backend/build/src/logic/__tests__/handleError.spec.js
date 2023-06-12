"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const handleError_1 = __importDefault(require("../handleError"));
const Response_1 = __importDefault(require("../../classes/Response"));
describe('handleError', () => {
    it('should return a 400 response for TypeError or SyntaxError', async () => {
        const error = new TypeError('This is a TypeError');
        const response = await (0, handleError_1.default)(error);
        expect(response).toBeInstanceOf(Response_1.default);
        expect(response.statusCode).toBe(400);
        expect(response.body).toBe(JSON.stringify({ message: error.message }));
    });
    it('should return a 500 response for other errors', async () => {
        const error = new Error('This is a general error');
        const response = await (0, handleError_1.default)(error);
        expect(response).toBeInstanceOf(Response_1.default);
        expect(response.statusCode).toBe(500);
        expect(response.body).toBe(JSON.stringify({ message: error.message }));
    });
});
//# sourceMappingURL=handleError.spec.js.map