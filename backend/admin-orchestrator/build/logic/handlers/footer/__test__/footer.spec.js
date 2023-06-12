"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _s3_module_1 = require("@s3_module");
const __1 = require("..");
jest.mock("@/logic/getEnvVariable");
jest.mock("@s3_module");
describe("handleFooterConfigGet function", () => {
    it("should throw an error if there is no configuration found for footer-config", async () => {
        const event = {};
        const env = "dev";
        const bucketName = "test-bucket-name";
        const s3 = new _s3_module_1.S3Operations(bucketName);
        s3.getJson = jest.fn(() => Promise.resolve(undefined));
        expect.assertions(1);
        try {
            await (0, __1.handleFooterConfigGet)(event, env);
        }
        catch (error) {
            expect(error.message).toEqual("No configuration found for footer-config.");
        }
    });
    it("should return a FooterConfig object", async () => {
        const event = {};
        const env = "dev";
        const bucketName = "test-bucket-name";
        const s3 = new _s3_module_1.S3Operations(bucketName);
        const footerConfigJson = {
            examples: ["example1", "example2"],
            icons: ["icon1", "icon2", "icon3"]
        };
        s3.getJson = jest.fn(() => Promise.resolve(footerConfigJson));
        const expectedFooterConfig = {
            examples: ["example1", "example2"],
            icons: ["icon1", "icon2", "icon3"]
        };
        const footerConfig = await (0, __1.handleFooterConfigGet)(event, env);
        expect(footerConfig).toEqual(expectedFooterConfig);
    });
});
describe("handleFooterConfigPut function", () => {
    it("should return void", async () => {
        const event = { body: JSON.stringify({ examples: ["example1", "example2"], icons: ["icon1", "icon2", "icon3"] }) };
        const env = "dev";
        const bucketName = "test-bucket-name";
        const s3 = new _s3_module_1.S3Operations(bucketName);
        s3.putJson = jest.fn();
        await (0, __1.handleFooterConfigPut)(event, env);
        expect(s3.putJson).toHaveBeenCalled();
    });
});
describe("handleFooterContentGet function", () => {
    it("should throw an error if there is no content found for footer-content", async () => {
        const event = {};
        const env = "dev";
        const bucketName = "test-bucket-name";
        const s3 = new _s3_module_1.S3Operations(bucketName);
        s3.getJson = jest.fn(() => Promise.resolve(undefined));
        expect.assertions(1);
        try {
            await (0, __1.handleFooterContentGet)(event, env);
        }
        catch (error) {
            expect(error.message).toEqual("No content found for footer-content.");
        }
    });
    it("should return a FooterContent object", async () => {
        const event = {};
        const env = "dev";
        const bucketName = "test-bucket-name";
        const s3 = new _s3_module_1.S3Operations(bucketName);
        const footerContentJson = { title: "Footer Title", description: "Footer description" };
        s3.getJson = jest.fn(() => Promise.resolve(footerContentJson));
        const expectedFooterContent = { title: "Footer Title", description: "Footer description" };
        const footerContent = await (0, __1.handleFooterContentGet)(event, env);
        expect(footerContent).toEqual(expectedFooterContent);
    });
});
describe("handleFooterContentPut function", () => {
    it("should return void", async () => {
        const event = { body: JSON.stringify({ title: "Footer Title", description: "Footer description" }) };
        const env = "dev";
        const bucketName = "test-bucket-name";
        const s3 = new _s3_module_1.S3Operations(bucketName);
        s3.putJson = jest.fn();
        await (0, __1.handleFooterContentPut)(event, env);
        expect(s3.putJson).toHaveBeenCalled();
    });
});
//# sourceMappingURL=footer.spec.js.map