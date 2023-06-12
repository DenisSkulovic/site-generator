// @ts-nocheck
import { handlePageDelete, handlePagePost, handlePagePut } from '../';
import { APIGatewayEvent } from 'aws-lambda';
import { S3Operations } from '@s3_module';
import { PageHTMLObject, buildPageHTMLObject } from '@page_cls_module';

jest.mock('@s3_module');

describe('handlePageDelete()', () => {
    it('should throw an error if url is undefined', async () => {
        const event: APIGatewayEvent = {
            queryStringParameters: {},
        } as APIGatewayEvent;
        await expect(handlePageDelete(event, 'dev')).rejects.toThrow('url is a mandatory query string param');
    });

    it('should throw an error if bucketName is undefined', async () => {
        const event: APIGatewayEvent = {
            queryStringParameters: { url: 'some-url' },
        } as unknown as APIGatewayEvent;
        const originalEnv = process.env.BUCKET_NAME;

        process.env.BUCKET_NAME = '';

        await expect(handlePageDelete(event, 'dev')).rejects.toThrow('BUCKET_NAME is a mandatory env param');

        process.env.BUCKET_NAME = originalEnv;
    });

    it('should call S3Operations.deletePage()', async () => {
        const mockDeletePage = jest.fn();
        const event: APIGatewayEvent = {
            queryStringParameters: { url: 'some-url' },
        } as unknown as APIGatewayEvent;

        (S3Operations as jest.MockedClass<typeof S3Operations>).mockImplementation(() => ({
            deletePage: mockDeletePage,
        }));

        await handlePageDelete(event, 'dev');

        expect(mockDeletePage).toHaveBeenCalledWith(event.queryStringParameters!.url);
    });
});

describe('handlePagePost()', () => {
    it('should throw an error if url is undefined', async () => {
        const event: APIGatewayEvent = {
            queryStringParameters: {},
        } as APIGatewayEvent;
        await expect(handlePagePost(event, 'dev')).rejects.toThrow('url is a mandatory query string param');
    });

    it('should throw an error if bucketName is undefined', async () => {
        const event: APIGatewayEvent = {
            queryStringParameters: { url: 'some-url' },
            body: "{}",
        } as unknown as APIGatewayEvent;
        const originalEnv = process.env.BUCKET_NAME;

        process.env.BUCKET_NAME = '';

        await expect(handlePagePost(event, 'dev')).rejects.toThrow('BUCKET_NAME is a mandatory env param');

        process.env.BUCKET_NAME = originalEnv;
    });

    it('should call S3Operations.uploadPage()', async () => {
        const mockUploadPage = jest.fn();
        const event: APIGatewayEvent = {
            queryStringParameters: { url: 'some-url' },
            body: "{}",
        } as unknown as APIGatewayEvent;

        (S3Operations as jest.MockedClass<typeof S3Operations>).mockImplementation(() => ({
            uploadPage: mockUploadPage,
        }));

        await handlePagePost(event, 'dev');

        expect(mockUploadPage).toHaveBeenCalledWith(event.queryStringParameters!.url, buildPageHTMLObject(JSON.parse(event.body || '{}')));
    });
});

describe('handlePagePut()', () => {
    it('should throw an error if url is undefined', async () => {
        const event: APIGatewayEvent = {
            queryStringParameters: {},
        } as APIGatewayEvent;
        await expect(handlePagePut(event, 'dev')).rejects.toThrow('url is a mandatory query string param');
    });

    it('should throw an error if bucketName is undefined', async () => {
        const event: APIGatewayEvent = {
            queryStringParameters: { url: 'some-url' },
            body: "{}",
        } as unknown as APIGatewayEvent;
        const originalEnv = process.env.BUCKET_NAME;

        process.env.BUCKET_NAME = '';

        await expect(handlePagePut(event, 'dev')).rejects.toThrow('BUCKET_NAME is a mandatory env param');

        process.env.BUCKET_NAME = originalEnv;
    });

    it('should call S3Operations.uploadPage()', async () => {
        const mockUploadPage = jest.fn();
        const event: APIGatewayEvent = {
            queryStringParameters: { url: 'some-url' },
            body: "{}",
        } as unknown as APIGatewayEvent;

        (S3Operations as jest.MockedClass<typeof S3Operations>).mockImplementation(() => ({
            uploadPage: mockUploadPage,
        }));

        await handlePagePut(event, 'dev');

        expect(mockUploadPage).toHaveBeenCalledWith(event.queryStringParameters!.url, buildPageHTMLObject(JSON.parse(event.body || '{}')));
    });
});
