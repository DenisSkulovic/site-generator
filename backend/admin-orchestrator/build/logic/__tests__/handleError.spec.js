"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const handleError_1 = __importDefault(require("../handleError"));
const Response_1 = __importDefault(require("../../classes/Response"));
describe('handleError function', () => {
    const mockError = new Error('Test error');
    const errResponse = new Response_1.default(500, JSON.stringify({ message: 'Internal Server Error' }));
    const typeError = new TypeError('Test type error');
    const syntaxError = new SyntaxError('Test syntax error');
    const badErrResponse = new Response_1.default(400, JSON.stringify({ message: typeError.message }));
    it('should return an instance of Response with status code 500 and message "Internal Server Error" for any error', async () => {
        const response = await (0, handleError_1.default)(mockError);
        expect(response).toEqual(errResponse);
    });
    it('should return an instance of Response with status code 400 and the message for any type or syntax errors', async () => {
        const typeErrorResponse = await (0, handleError_1.default)(typeError);
        expect(typeErrorResponse).toEqual(badErrResponse);
        const syntaxErrorResponse = await (0, handleError_1.default)(syntaxError);
        expect(syntaxErrorResponse).toEqual(badErrResponse);
    });
});
//# sourceMappingURL=handleError.spec.js.map