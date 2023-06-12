"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
describe('Test handleHeaderConfigGet', () => {
    it('should return HeaderConfig', async () => {
        const event = {}; // mock event object
        const env = 'dev'; // mock environment variable
        jest.mock('@/logic/getEnvVariable', () => () => 'example-bucket-name');
        jest.mock('@s3_module', () => ({
            S3Operations: jest.fn().mockImplementation(() => ({
                getJson: jest.fn().mockReturnValue({ exampleKey: 'exampleValue' }),
            })),
        }));
        jest.mock('@page_cls_module', () => ({
            buildHeaderConfig: jest.fn().mockReturnValue({ exampleKey: 'exampleValue' }),
        }));
        const response = await (0, __1.handleHeaderConfigGet)(event, env);
        expect(response).toEqual({ exampleKey: 'exampleValue' });
    });
    it('should throw an error if header-config is not found', async () => {
        const event = {}; // mock event object
        const env = 'dev'; // mock environment variable
        jest.mock('@/logic/getEnvVariable', () => () => 'example-bucket-name');
        jest.mock('@s3_module', () => ({
            S3Operations: jest.fn().mockImplementation(() => ({
                getJson: jest.fn().mockReturnValue(undefined),
            })),
        }));
        expect.assertions(1);
        try {
            await (0, __1.handleHeaderConfigGet)(event, env);
        }
        catch (error) {
            expect(error.message).toBe('No configuration found for header-config.');
        }
    });
});
describe('Test handleHeaderConfigPut', () => {
    it('should successfully put HeaderConfig', async () => {
        const event = { body: JSON.stringify({ exampleKey: 'exampleValue' }) }; // mock event object
        const env = 'dev'; // mock environment variable
        jest.mock('@/logic/getEnvVariable', () => () => 'example-bucket-name');
        jest.mock('@s3_module', () => ({
            S3Operations: jest.fn().mockImplementation(() => ({
                putJson: jest.fn(),
            })),
        }));
        await expect((0, __1.handleHeaderConfigPut)(event, env)).resolves.toBeUndefined();
    });
});
describe('Test handleHeaderContentGet', () => {
    it('should return HeaderContent', async () => {
        const event = {}; // mock event object
        const env = 'dev'; // mock environment variable
        jest.mock('@/logic/getEnvVariable', () => () => 'example-bucket-name');
        jest.mock('@s3_module', () => ({
            S3Operations: jest.fn().mockImplementation(() => ({
                getJson: jest.fn().mockReturnValue({ exampleKey: 'exampleValue' }),
            })),
        }));
        jest.mock('@page_cls_module', () => ({
            buildHeaderContent: jest.fn().mockReturnValue({ exampleKey: 'exampleValue' }),
        }));
        const response = await (0, __1.handleHeaderContentGet)(event, env);
        expect(response).toEqual({ exampleKey: 'exampleValue' });
    });
    it('should throw an error if header-content is not found', async () => {
        const event = {}; // mock event object
        const env = 'dev'; // mock environment variable
        jest.mock('@/logic/getEnvVariable', () => () => 'example-bucket-name');
        jest.mock('@s3_module', () => ({
            S3Operations: jest.fn().mockImplementation(() => ({
                getJson: jest.fn().mockReturnValue(undefined),
            })),
        }));
        expect.assertions(1);
        try {
            await (0, __1.handleHeaderContentGet)(event, env);
        }
        catch (error) {
            expect(error.message).toBe('No content found for header-content.');
        }
    });
});
describe('Test handleHeaderContentPut', () => {
    it('should successfully put HeaderContent', async () => {
        const event = { body: JSON.stringify({ exampleKey: 'exampleValue' }) }; // mock event object
        const env = 'dev'; // mock environment variable
        jest.mock('@/logic/getEnvVariable', () => () => 'example-bucket-name');
        jest.mock('@s3_module', () => ({
            S3Operations: jest.fn().mockImplementation(() => ({
                putJson: jest.fn(),
            })),
        }));
        await expect((0, __1.handleHeaderContentPut)(event, env)).resolves.toBeUndefined();
    });
});
//# sourceMappingURL=header.spec.js.map