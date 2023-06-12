// @ts-nocheck
import { APIGatewayEvent } from 'aws-lambda';
import { handleHeaderConfigGet, handleHeaderConfigPut, handleHeaderContentGet, handleHeaderContentPut } from '../';

describe('Test handleHeaderConfigGet', () => {
    it('should return HeaderConfig', async () => {
        const event: APIGatewayEvent = {} as unknown as APIGatewayEvent; // mock event object
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
        const response = await handleHeaderConfigGet(event, env);
        expect(response).toEqual({ exampleKey: 'exampleValue' });
    });

    it('should throw an error if header-config is not found', async () => {
        const event: APIGatewayEvent = {} as unknown as APIGatewayEvent; // mock event object
        const env = 'dev'; // mock environment variable
        jest.mock('@/logic/getEnvVariable', () => () => 'example-bucket-name');
        jest.mock('@s3_module', () => ({
            S3Operations: jest.fn().mockImplementation(() => ({
                getJson: jest.fn().mockReturnValue(undefined),
            })),
        }));
        expect.assertions(1);
        try {
            await handleHeaderConfigGet(event, env);
        } catch (error: any) {
            expect(error.message).toBe('No configuration found for header-config.');
        }
    });
});

describe('Test handleHeaderConfigPut', () => {
    it('should successfully put HeaderConfig', async () => {
        const event = { body: JSON.stringify({ exampleKey: 'exampleValue' }) } as unknown as APIGatewayEvent; // mock event object
        const env = 'dev'; // mock environment variable
        jest.mock('@/logic/getEnvVariable', () => () => 'example-bucket-name');
        jest.mock('@s3_module', () => ({
            S3Operations: jest.fn().mockImplementation(() => ({
                putJson: jest.fn(),
            })),
        }));
        await expect(handleHeaderConfigPut(event, env)).resolves.toBeUndefined();
    });
});

describe('Test handleHeaderContentGet', () => {
    it('should return HeaderContent', async () => {
        const event = {} as unknown as APIGatewayEvent; // mock event object
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
        const response = await handleHeaderContentGet(event, env);
        expect(response).toEqual({ exampleKey: 'exampleValue' });
    });

    it('should throw an error if header-content is not found', async () => {
        const event = {} as unknown as APIGatewayEvent; // mock event object
        const env = 'dev'; // mock environment variable
        jest.mock('@/logic/getEnvVariable', () => () => 'example-bucket-name');
        jest.mock('@s3_module', () => ({
            S3Operations: jest.fn().mockImplementation(() => ({
                getJson: jest.fn().mockReturnValue(undefined),
            })),
        }));
        expect.assertions(1);
        try {
            await handleHeaderContentGet(event, env);
        } catch (error: any) {
            expect(error.message).toBe('No content found for header-content.');
        }
    });
});

describe('Test handleHeaderContentPut', () => {
    it('should successfully put HeaderContent', async () => {
        const event = { body: JSON.stringify({ exampleKey: 'exampleValue' }) } as unknown as APIGatewayEvent; // mock event object
        const env = 'dev'; // mock environment variable
        jest.mock('@/logic/getEnvVariable', () => () => 'example-bucket-name');
        jest.mock('@s3_module', () => ({
            S3Operations: jest.fn().mockImplementation(() => ({
                putJson: jest.fn(),
            })),
        }));
        await expect(handleHeaderContentPut(event, env)).resolves.toBeUndefined();
    });
});
