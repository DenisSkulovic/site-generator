"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const getDistributionId_1 = __importDefault(require("../getDistributionId"));
describe('getDistributionId function', () => {
    afterEach(() => {
        jest.clearAllMocks();
        process.env = {};
    });
    it('should return DISTRIBUTION_ID_PROD from the environment if env is prod', () => {
        const env = 'prod';
        const expectedId = 'abc123';
        process.env.DISTRIBUTION_ID_PROD = expectedId;
        const actualId = (0, getDistributionId_1.default)(env);
        expect(actualId).toEqual(expectedId);
        expect(process.env.DISTRIBUTION_ID_PROD).toEqual(expectedId);
        expect(process.env.DISTRIBUTION_ID_DEV).toBeUndefined();
    });
    it('should return DISTRIBUTION_ID_DEV from the environment if env is dev', () => {
        const env = 'dev';
        const expectedId = 'def456';
        process.env.DISTRIBUTION_ID_DEV = expectedId;
        const actualId = (0, getDistributionId_1.default)(env);
        expect(actualId).toEqual(expectedId);
        expect(process.env.DISTRIBUTION_ID_DEV).toEqual(expectedId);
        expect(process.env.DISTRIBUTION_ID_PROD).toBeUndefined();
    });
    it('should throw an error if DISTRIBUTION_ID_PROD is not set and env is prod', () => {
        const env = 'prod';
        expect(() => (0, getDistributionId_1.default)(env)).toThrow('DISTRIBUTION_ID_PROD is a mandatory env param');
    });
    it('should throw an error if DISTRIBUTION_ID_DEV is not set and env is dev', () => {
        const env = 'dev';
        expect(() => (0, getDistributionId_1.default)(env)).toThrow('DISTRIBUTION_ID_DEV is a mandatory env param');
    });
});
//# sourceMappingURL=getDistributionId.spec.js.map