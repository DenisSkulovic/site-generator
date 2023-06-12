"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const __1 = require("../");
const _s3_module_1 = require("@s3_module");
const _page_cls_module_1 = require("@page_cls_module");
jest.mock('@s3_module');
describe('handlePageDelete()', () => {
    it('should throw an error if url is undefined', async () => {
        const event = {
            queryStringParameters: {},
        };
        await expect((0, __1.handlePageDelete)(event, 'dev')).rejects.toThrow('url is a mandatory query string param');
    });
    it('should throw an error if bucketName is undefined', async () => {
        const event = {
            queryStringParameters: { url: 'some-url' },
        };
        const originalEnv = process.env.BUCKET_NAME;
        process.env.BUCKET_NAME = '';
        await expect((0, __1.handlePageDelete)(event, 'dev')).rejects.toThrow('BUCKET_NAME is a mandatory env param');
        process.env.BUCKET_NAME = originalEnv;
    });
    it('should call S3Operations.deletePage()', async () => {
        const mockDeletePage = jest.fn();
        const event = {
            queryStringParameters: { url: 'some-url' },
        };
        _s3_module_1.S3Operations.mockImplementation(() => ({
            deletePage: mockDeletePage,
        }));
        await (0, __1.handlePageDelete)(event, 'dev');
        expect(mockDeletePage).toHaveBeenCalledWith(event.queryStringParameters.url);
    });
});
describe('handlePagePost()', () => {
    it('should throw an error if url is undefined', async () => {
        const event = {
            queryStringParameters: {},
        };
        await expect((0, __1.handlePagePost)(event, 'dev')).rejects.toThrow('url is a mandatory query string param');
    });
    it('should throw an error if bucketName is undefined', async () => {
        const event = {
            queryStringParameters: { url: 'some-url' },
            body: "{}",
        };
        const originalEnv = process.env.BUCKET_NAME;
        process.env.BUCKET_NAME = '';
        await expect((0, __1.handlePagePost)(event, 'dev')).rejects.toThrow('BUCKET_NAME is a mandatory env param');
        process.env.BUCKET_NAME = originalEnv;
    });
    it('should call S3Operations.uploadPage()', async () => {
        const mockUploadPage = jest.fn();
        const event = {
            queryStringParameters: { url: 'some-url' },
            body: "{}",
        };
        _s3_module_1.S3Operations.mockImplementation(() => ({
            uploadPage: mockUploadPage,
        }));
        await (0, __1.handlePagePost)(event, 'dev');
        expect(mockUploadPage).toHaveBeenCalledWith(event.queryStringParameters.url, (0, _page_cls_module_1.buildPageHTMLObject)(JSON.parse(event.body || '{}')));
    });
});
describe('handlePagePut()', () => {
    it('should throw an error if url is undefined', async () => {
        const event = {
            queryStringParameters: {},
        };
        await expect((0, __1.handlePagePut)(event, 'dev')).rejects.toThrow('url is a mandatory query string param');
    });
    it('should throw an error if bucketName is undefined', async () => {
        const event = {
            queryStringParameters: { url: 'some-url' },
            body: "{}",
        };
        const originalEnv = process.env.BUCKET_NAME;
        process.env.BUCKET_NAME = '';
        await expect((0, __1.handlePagePut)(event, 'dev')).rejects.toThrow('BUCKET_NAME is a mandatory env param');
        process.env.BUCKET_NAME = originalEnv;
    });
    it('should call S3Operations.uploadPage()', async () => {
        const mockUploadPage = jest.fn();
        const event = {
            queryStringParameters: { url: 'some-url' },
            body: "{}",
        };
        _s3_module_1.S3Operations.mockImplementation(() => ({
            uploadPage: mockUploadPage,
        }));
        await (0, __1.handlePagePut)(event, 'dev');
        expect(mockUploadPage).toHaveBeenCalledWith(event.queryStringParameters.url, (0, _page_cls_module_1.buildPageHTMLObject)(JSON.parse(event.body || '{}')));
    });
});
//# sourceMappingURL=pages.spec.js.map