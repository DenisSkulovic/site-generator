import * as AWS from 'aws-sdk';
import { createFooterHTMLObject } from '../../../../../../../page_cls_module/src/mockFactories';
import fetchFooterFromS3 from '../fetchFooterFromS3';
import { FooterHTMLObject } from '../../../../../../../page_cls_module/src';

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

describe("fetchFooterFromS3", () => {
    beforeEach(() => {
        process.env.BUCKET_NAME = "test-bucket";
        process.env.FOOTER_KEY_S3 = "test-footer-key";
        const s3 = new AWS.S3();
        (s3.getObject().promise as jest.Mock).mockResolvedValue({ Body: JSON.stringify(createFooterHTMLObject({})) });
    });

    test("Should return a FooterHTMLObject instance", async () => {
        const footer = await fetchFooterFromS3();
        expect(footer).toBeDefined();
        expect(footer).toBeInstanceOf(FooterHTMLObject);
    });

    test("Should throw an error when environment variables are not set", async () => {
        delete process.env.BUCKET_NAME;
        delete process.env.FOOTER_KEY_S3;
        await expect(fetchFooterFromS3()).rejects.toThrow();
    });
});