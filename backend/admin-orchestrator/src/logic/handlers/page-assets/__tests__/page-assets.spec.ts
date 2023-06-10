import { APIGatewayEvent } from 'aws-lambda';
import { handleAssetUpload, handleAssetDownload } from '../';
import { S3Operations } from '@s3_module';

jest.mock('@s3_module');

describe('Asset handlers', () => {
    let mockEvent: APIGatewayEvent;
    let mockBucketName: string;

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
        } as unknown as APIGatewayEvent;

        (S3Operations as jest.Mock).mockClear();
    });

    test('handleAssetUpload', async () => {
        const mockS3 = { uploadAsset: jest.fn() };
        (S3Operations as jest.Mock).mockImplementation(() => mockS3);

        await handleAssetUpload(mockEvent, 'dev');

        expect(S3Operations).toHaveBeenCalledWith(mockBucketName);
        expect(mockS3.uploadAsset).toHaveBeenCalledWith('mockPath', { data: 'mockData' });
    });

    test('handleAssetDownload', async () => {
        const mockAssetData = { Body: 'mockAssetData' };
        const mockS3 = { downloadAsset: jest.fn().mockResolvedValue(mockAssetData) };
        (S3Operations as jest.Mock).mockImplementation(() => mockS3);

        const response = await handleAssetDownload(mockEvent, 'dev');

        expect(S3Operations).toHaveBeenCalledWith(mockBucketName);
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
