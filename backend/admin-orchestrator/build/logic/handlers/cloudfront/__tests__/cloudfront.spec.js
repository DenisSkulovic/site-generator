"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const __1 = require("../");
describe('handleInvalidateByRegex', () => {
    const APIGatewayEventMock = {
        body: JSON.stringify({ "regex": ".*\\.js$" }),
    };
    const env = 'dev';
    const CloudFrontOperationsMock = jest.fn(() => ({
        createInvalidation: jest.fn().mockResolvedValue({}),
    }));
    const getDistributionIdMock = jest.fn((env) => 'fake-distribution-id');
    it('should create an invalidation with the given regex and distributionId', async () => {
        const cloudfrontMock = new CloudFrontOperationsMock();
        const distributionId = await getDistributionIdMock(env);
        // pass all required arguments to handleInvalidateByRegex
        await (0, __1.handleInvalidateByRegex)(APIGatewayEventMock, env, cloudfrontMock);
        expect(cloudfrontMock.createInvalidation).toHaveBeenCalledWith(distributionId, { "Paths": { "Items": [".*\\.js$"], "Quantity": 1 } } // use correct object structure
        );
    });
    it('should throw a TypeError if regex is not a string', async () => {
        const APIGatewayEventWrongRegexMock = {
            body: JSON.stringify({ "regex": 123 }), // pass a number instead of a string
        };
        // check for the specific error that should be thrown
        await expect((0, __1.handleInvalidateByRegex)(APIGatewayEventWrongRegexMock, env)).rejects.toThrow(TypeError);
    });
});
//# sourceMappingURL=cloudfront.spec.js.map