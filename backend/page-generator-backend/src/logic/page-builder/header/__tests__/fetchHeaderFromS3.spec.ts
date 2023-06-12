
// @ts-nocheck
import * as AWS from 'aws-sdk';
import { createHeaderHTMLObject } from '../../../../../../../page_cls_module/src/mockFactories';
import fetchHeaderFromS3 from '../fetchHeaderFromS3';
import { HeaderHTMLObject } from '@page_cls_module';

jest.mock('aws-sdk', () => {
    return {
        S3: jest.fn().mockImplementation(() => {
            return {
                getObject: jest.fn().mockImplementation(() => {
                    return {
                        promise: jest.fn(),
                    };
                }),
            };
        }),
    };
});

describe("fetchHeaderFromS3", () => {
    beforeEach(() => {
        process.env.BUCKET_NAME = "test-bucket";
        process.env.HEADER_KEY_S3 = "test-header-key";
        const s3 = new AWS.S3();
        (s3.getObject().promise as jest.Mock).mockResolvedValue({ Body: JSON.stringify(createHeaderHTMLObject({})) });
    });

    test("Should return a HeaderHTMLObject instance", async () => {
        const header = await fetchHeaderFromS3();
        expect(header).toBeDefined();
        expect(header).toBeInstanceOf(HeaderHTMLObject);
    });

    test("Should throw an error when environment variables are not set", async () => {
        delete process.env.BUCKET_NAME;
        delete process.env.HEADER_KEY_S3;
        await expect(fetchHeaderFromS3()).rejects.toThrow();
    });
});