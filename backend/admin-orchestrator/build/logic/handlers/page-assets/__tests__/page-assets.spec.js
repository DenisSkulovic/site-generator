"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const _s3_module_1 = require("@s3_module");
jest.mock('@s3_module');
describe('Asset handlers', () => {
    let mockEvent;
    let mockBucketName;
    beforeEach(() => {
        mockBucketName = 'test-bucket';
        process.env.BUCKET_NAME = mockBucketName;
        mockEvent = {
            body: JSON.stringify({ data: 'mockData' }),
            queryStringParameters: { path: 'mockPath' },
            headers: {},
            multiValueHeaders: {},
            httpMethod: '',
            isBase64Encoded: false,
            path: '',
            pathParameters: null,
            stageVariables: null,
            requestContext: undefined,
            resource: '',
        };
        _s3_module_1.S3Operations.mockClear();
    });
    test('handleAssetUpload', async () => {
        const mockS3 = { uploadAsset: jest.fn() };
        _s3_module_1.S3Operations.mockImplementation(() => mockS3);
        await (0, __1.handleAssetUpload)(mockEvent, 'dev');
        expect(_s3_module_1.S3Operations).toHaveBeenCalledWith(mockBucketName);
        expect(mockS3.uploadAsset).toHaveBeenCalledWith('mockPath', { data: 'mockData' });
    });
    test('handleAssetDownload', async () => {
        const mockAssetData = { Body: 'mockAssetData' };
        const mockS3 = { downloadAsset: jest.fn().mockResolvedValue(mockAssetData) };
        _s3_module_1.S3Operations.mockImplementation(() => mockS3);
        const response = await (0, __1.handleAssetDownload)(mockEvent, 'dev');
        expect(_s3_module_1.S3Operations).toHaveBeenCalledWith(mockBucketName);
        expect(mockS3.downloadAsset).toHaveBeenCalledWith('mockPath');
        expect(response).toEqual({
            statusCode: 200,
            body: JSON.stringify(mockAssetData),
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename=mockPath',
            },
            isBase64Encoded: true,
        });
    });
});
//# sourceMappingURL=page-assets.spec.js.map