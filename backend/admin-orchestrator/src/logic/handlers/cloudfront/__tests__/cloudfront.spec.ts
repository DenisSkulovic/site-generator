// @ts-nocheck
import  { handleInvalidateByRegex } from "../"

describe('handleInvalidateByRegex', () => {
    const APIGatewayEventMock = {
        body: JSON.stringify({ "regex": ".*\\.js$" }),
    };

    const env = 'dev';

    const CloudFrontOperationsMock = jest.fn(() => ({
        createInvalidation: jest.fn().mockResolvedValue({}),
    }));

    const getDistributionIdMock = jest.fn((env: string) => 'fake-distribution-id');

    it('should create an invalidation with the given regex and distributionId', async () => {
        const cloudfrontMock = new CloudFrontOperationsMock();
        const distributionId = await getDistributionIdMock(env);

        // pass all required arguments to handleInvalidateByRegex
        await handleInvalidateByRegex(APIGatewayEventMock, env, cloudfrontMock);

        expect(cloudfrontMock.createInvalidation).toHaveBeenCalledWith(
            distributionId,
            { "Paths": { "Items": [".*\\.js$"], "Quantity": 1 } } // use correct object structure
        );
    });

    it('should throw a TypeError if regex is not a string', async () => {
        const APIGatewayEventWrongRegexMock = {
            body: JSON.stringify({ "regex": 123 }), // pass a number instead of a string
        };

        // check for the specific error that should be thrown
        await expect(handleInvalidateByRegex(APIGatewayEventWrongRegexMock, env)).rejects.toThrow(TypeError);
    });
});
