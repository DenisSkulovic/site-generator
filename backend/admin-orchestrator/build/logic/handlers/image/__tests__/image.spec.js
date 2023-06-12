"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const __1 = require("../");
const _s3_module_1 = require("@s3_module");
const getEnvVariable_1 = __importDefault(require("@/logic/getEnvVariable"));
describe('imageHandlers', () => {
    const env = 'dev';
    const bucketName = 'bucket-name';
    beforeAll(() => {
        jest.mock('@s3_module');
        jest.mock('@/logic/getEnvVariable');
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    describe('handleImageDelete', () => {
        const deleteImageMock = jest.fn().mockResolvedValue(undefined);
        beforeEach(() => {
            _s3_module_1.S3Operations.mockImplementation(() => ({
                deleteImage: deleteImageMock,
            }));
            getEnvVariable_1.default.mockReturnValue(bucketName);
        });
        it('should throw an error if key is not present in path parameters', async () => {
            // Arrange
            const event = {
                pathParameters: {},
            };
            try {
                // Act
                await (0, __1.handleImageDelete)(event, env);
            }
            catch (error) {
                // Assert
                expect(error.message).toBe('key is a mandatory path param');
                expect(_s3_module_1.S3Operations).not.toHaveBeenCalled();
                expect(deleteImageMock).not.toHaveBeenCalled();
            }
        });
        it('should delete the image from S3 and return undefined on success', async () => {
            // Arrange
            const event = {
                pathParameters: {
                    key: 'image-key',
                },
            };
            // Act
            await (0, __1.handleImageDelete)(event, env);
            // Assert
            expect(_s3_module_1.S3Operations).toHaveBeenCalledWith(bucketName);
            expect(deleteImageMock).toHaveBeenCalledWith('image-key');
        });
    });
    describe('handleImageGet', () => {
        const getImageMock = jest.fn().mockResolvedValue({ Body: Buffer.from('image-data') });
        beforeEach(() => {
            _s3_module_1.S3Operations.mockImplementation(() => ({
                getImage: getImageMock,
            }));
            getEnvVariable_1.default.mockReturnValue(bucketName);
        });
        it('should throw an error if key is not present in path parameters', async () => {
            // Arrange
            const event = {
                pathParameters: {},
            };
            try {
                // Act
                await (0, __1.handleImageGet)(event, env);
            }
            catch (error) {
                // Assert
                expect(error.message).toBe('key is a mandatory path param');
                expect(_s3_module_1.S3Operations).not.toHaveBeenCalled();
                expect(getImageMock).not.toHaveBeenCalled();
            }
        });
        it('should get the image from S3 and return GetObjectOutput on success', async () => {
            // Arrange
            const event = {
                pathParameters: {
                    key: 'image-key',
                },
            };
            // Act
            const result = await (0, __1.handleImageGet)(event, env);
            // Assert
            expect(_s3_module_1.S3Operations).toHaveBeenCalledWith(bucketName);
            expect(getImageMock).toHaveBeenCalledWith('image-key');
            expect(result).toEqual({
                Body: Buffer.from('image-data'),
            });
        });
    });
    describe('handleImagePost', () => {
        const uploadImageMock = jest.fn().mockResolvedValue(undefined);
        beforeEach(() => {
            _s3_module_1.S3Operations.mockImplementation(() => ({
                uploadImage: uploadImageMock,
            }));
            getEnvVariable_1.default.mockReturnValue(bucketName);
        });
        it('should throw an error if key is not present in body', async () => {
            // Arrange
            const event = {
                body: '{"imageData": "SGVsbG8gV29ybGQ=", "contentType": "image/png"}',
            };
            try {
                // Act
                await (0, __1.handleImagePost)(event, env);
            }
            catch (error) {
                // Assert
                expect(error.message).toBe('key is a mandatory path param');
                expect(_s3_module_1.S3Operations).not.toHaveBeenCalled();
                expect(uploadImageMock).not.toHaveBeenCalled();
            }
        });
        it('should throw an error if imageData is not present in body', async () => {
            // Arrange
            const event = {
                body: '{"key": "image-key", "contentType": "image/png"}',
            };
            try {
                // Act
                await (0, __1.handleImagePost)(event, env);
            }
            catch (error) {
                // Assert
                expect(error.message).toBe('imageData is a mandatory path param');
                expect(_s3_module_1.S3Operations).not.toHaveBeenCalled();
                expect(uploadImageMock).not.toHaveBeenCalled();
            }
        });
        it('should throw an error if contentType is not present in body', async () => {
            // Arrange
            const event = {
                body: '{"key": "image-key", "imageData": "SGVsbG8gV29ybGQ="}',
            };
            try {
                // Act
                await (0, __1.handleImagePost)(event, env);
            }
            catch (error) {
                // Assert
                expect(error.message).toBe('contentType is a mandatory path param');
                expect(_s3_module_1.S3Operations).not.toHaveBeenCalled();
                expect(uploadImageMock).not.toHaveBeenCalled();
            }
        });
        it('should upload the image to S3 on success', async () => {
            // Arrange
            const event = {
                body: '{"key": "image-key", "imageData": "SGVsbG8gV29ybGQ=", "contentType": "image/png"}',
            };
            // Act
            await (0, __1.handleImagePost)(event, env);
            // Assert
            expect(_s3_module_1.S3Operations).toHaveBeenCalledWith(bucketName);
            expect(uploadImageMock).toHaveBeenCalledWith(Buffer.from('Hello World'), 'image-key', 'image/png');
        });
    });
    describe('handleImagePut', () => {
        const uploadImageMock = jest.fn().mockResolvedValue(undefined);
        beforeEach(() => {
            _s3_module_1.S3Operations.mockImplementation(() => ({
                uploadImage: uploadImageMock,
            }));
            getEnvVariable_1.default.mockReturnValue(bucketName);
        });
        it('should throw an error if key is not present in body', async () => {
            // Arrange
            const event = {
                body: '{"imageData": "SGVsbG8gV29ybGQ=", "contentType": "image/png"}',
            };
            try {
                // Act
                await (0, __1.handleImagePut)(event, env);
            }
            catch (error) {
                // Assert
                expect(error.message).toBe('key is a mandatory path param');
                expect(_s3_module_1.S3Operations).not.toHaveBeenCalled();
                expect(uploadImageMock).not.toHaveBeenCalled();
            }
        });
        it('should throw an error if imageData is not present in body', async () => {
            // Arrange
            const event = {
                body: '{"key": "image-key", "contentType": "image/png"}',
            };
            try {
                // Act
                await (0, __1.handleImagePut)(event, env);
            }
            catch (error) { // Assert
                expect(error.message).toBe('imageData is a mandatory path param');
                expect(_s3_module_1.S3Operations).not.toHaveBeenCalled();
                expect(uploadImageMock).not.toHaveBeenCalled();
            }
        });
        it('should throw an error if contentType is not present in body', async () => {
            // Arrange
            const event = {
                body: '{"key": "image-key", "imageData": "SGVsbG8gV29ybGQ="}',
            };
            try {
                // Act
                await (0, __1.handleImagePut)(event, env);
            }
            catch (error) {
                // Assert
                expect(error.message).toBe('contentType is a mandatory path param');
                expect(_s3_module_1.S3Operations).not.toHaveBeenCalled();
                expect(uploadImageMock).not.toHaveBeenCalled();
            }
        });
        it('should upload the image to S3 on success', async () => {
            // Arrange
            const event = {
                body: '{"key": "image-key", "imageData": "SGVsbG8gV29ybGQ=", "contentType": "image/png"}',
            };
            // Act
            await (0, __1.handleImagePut)(event, env);
            // Assert
            expect(_s3_module_1.S3Operations).toHaveBeenCalledWith(bucketName);
            expect(uploadImageMock).toHaveBeenCalledWith(Buffer.from('Hello World'), 'image-key', 'image/png');
        });
    });
});
//# sourceMappingURL=image.spec.js.map