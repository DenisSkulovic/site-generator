"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
// Import the function and any other necessary dependencies
const getEnvVariable_1 = __importDefault(require("../getEnvVariable"));
// Test suite
describe('getEnvVariable', () => {
    // Test case 1
    it('should return the value of a defined environment variable', () => {
        process.env.MY_VARIABLE = 'abc123';
        const variableValue = (0, getEnvVariable_1.default)('MY_VARIABLE');
        expect(variableValue).toEqual('abc123');
    });
    // Test case 2
    it('should throw an error for an undefined environment variable', () => {
        process.env.MY_VARIABLE_2 = undefined;
        expect(() => (0, getEnvVariable_1.default)('MY_VARIABLE_2')).toThrow('MY_VARIABLE_2 is a mandatory env param');
    });
});
//# sourceMappingURL=getEnvVariable.spec.js.map