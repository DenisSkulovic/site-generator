"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const __1 = require("../");
const _s3_module_1 = require("@s3_module");
const getEnvVariable_1 = __importDefault(require("@/logic/getEnvVariable"));
jest.mock('@s3_module');
jest.mock('@/logic/getEnvVariable');
describe('handleSiteConfigGet', () => {
    it('should fetch and build site config object successfully', async () => {
        const sampleSiteConfigJson = { /* your sample site config json object */};
        const siteConfigObject = { /* your sample site config object */};
        const mockedGetJson = jest.fn(() => Promise.resolve(sampleSiteConfigJson));
        _s3_module_1.S3Operations.prototype.getJson = mockedGetJson;
        getEnvVariable_1.default.mockImplementation(() => 'sample-bucket-name');
        const event = { /* your sample APIGatewayEvent object */};
        const env = 'dev';
        const result = await (0, __1.handleSiteConfigGet)(event, env);
        expect(mockedGetJson).toHaveBeenCalledWith('site-config');
        expect(result).toEqual(siteConfigObject);
    });
});
describe('handleSiteConfigPut', () => {
    it('should put site config object successfully', async () => {
        const sampleRequestBody = { /* your sample request body object */};
        const siteConfigObject = { /* your sample site config object */};
        const mockedPutJson = jest.fn(() => Promise.resolve());
        _s3_module_1.S3Operations.prototype.putJson = mockedPutJson;
        getEnvVariable_1.default.mockImplementation(() => 'sample-bucket-name');
        const event = { body: JSON.stringify(sampleRequestBody) };
        const env = 'prod';
        await (0, __1.handleSiteConfigPut)(event, env);
        expect(mockedPutJson).toHaveBeenCalledWith('site-config', siteConfigObject);
    });
});
//# sourceMappingURL=site-config.spec.js.map