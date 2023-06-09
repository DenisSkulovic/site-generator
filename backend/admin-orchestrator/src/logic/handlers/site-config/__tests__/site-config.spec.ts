import { handleSiteConfigGet, handleSiteConfigPut } from '../';
import { APIGatewayEvent } from 'aws-lambda';
import { SiteConfig } from '@admin_cls_module';
import { S3Operations } from '@s3_module';
import getEnvVariable from '@/logic/getEnvVariable';

jest.mock('@s3_module');
jest.mock('@/logic/getEnvVariable');

describe('handleSiteConfigGet', () => {
    it('should fetch and build site config object successfully', async () => {
        const sampleSiteConfigJson = { /* your sample site config json object */ };
        const siteConfigObject = { /* your sample site config object */ };
        const mockedGetJson = jest.fn(() => Promise.resolve(sampleSiteConfigJson));
        S3Operations.prototype.getJson = mockedGetJson;
        getEnvVariable.mockImplementation(() => 'sample-bucket-name');

        const event = { /* your sample APIGatewayEvent object */ };
        const env = 'dev';
        const result = await handleSiteConfigGet(event, env);

        expect(mockedGetJson).toHaveBeenCalledWith('site-config');
        expect(result).toEqual(siteConfigObject);
    });
});

describe('handleSiteConfigPut', () => {
    it('should put site config object successfully', async () => {
        const sampleRequestBody = { /* your sample request body object */ };
        const siteConfigObject = { /* your sample site config object */ };
        const mockedPutJson = jest.fn(() => Promise.resolve());
        S3Operations.prototype.putJson = mockedPutJson;
        getEnvVariable.mockImplementation(() => 'sample-bucket-name');

        const event = { body: JSON.stringify(sampleRequestBody) } as unknown as APIGatewayEvent;
        const env = 'prod';
        await handleSiteConfigPut(event, env);

        expect(mockedPutJson).toHaveBeenCalledWith('site-config', siteConfigObject);
    });
});
