import { handleImageDelete, handleImageGet, handleImagePost, handleImagePut } from '../';
import { APIGatewayEvent } from 'aws-lambda';
import { S3Operations } from '@s3_module';
import getEnvVariable from '@/logic/getEnvVariable';

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
            S3Operations.mockImplementation(() => ({
                deleteImage: deleteImageMock,
            }));
            getEnvVariable.mockReturnValue(bucketName);
        });

        it('should throw an error if key is not present in path parameters', async () => {
            // Arrange
            const event = {
                pathParameters: {},
            } as APIGatewayEvent;

            try {
                // Act
                await handleImageDelete(event, env);
            } catch (error) {
                // Assert
                expect(error.message).toBe('key is a mandatory path param');
                expect(S3Operations).not.toHaveBeenCalled();
                expect(deleteImageMock).not.toHaveBeenCalled();
            }
        });

        it('should delete the image from S3 and return undefined on success', async () => {
            // Arrange
            const event = {
                pathParameters: {
                    key: 'image-key',
                },
            } as unknown as APIGatewayEvent;

            // Act
            await handleImageDelete(event, env);

            // Assert
            expect(S3Operations).toHaveBeenCalledWith(bucketName);
            expect(deleteImageMock).toHaveBeenCalledWith('image-key');
        });
    });

    describe('handleImageGet', () => {
        const getImageMock = jest.fn().mockResolvedValue({ Body: Buffer.from('image-data') });

        beforeEach(() => {
            S3Operations.mockImplementation(() => ({
                getImage: getImageMock,
            }));
            getEnvVariable.mockReturnValue(bucketName);
        });

        it('should throw an error if key is not present in path parameters', async () => {
            // Arrange
            const event = {
                pathParameters: {},
            } as unknown as APIGatewayEvent;

            try {
                // Act
                await handleImageGet(event, env);
            } catch (error: any) {
                // Assert
                expect(error.message).toBe('key is a mandatory path param');
                expect(S3Operations).not.toHaveBeenCalled();
                expect(getImageMock).not.toHaveBeenCalled();
            }
        });

        it('should get the image from S3 and return GetObjectOutput on success', async () => {
            // Arrange
            const event = {
                pathParameters: {
                    key: 'image-key',
                },
            } as unknown as APIGatewayEvent;

            // Act
            const result = await handleImageGet(event, env);

            // Assert
            expect(S3Operations).toHaveBeenCalledWith(bucketName);
            expect(getImageMock).toHaveBeenCalledWith('image-key');
            expect(result).toEqual({
                Body: Buffer.from('image-data'),
            });
        });
    });

    describe('handleImagePost', () => {
        const uploadImageMock = jest.fn().mockResolvedValue(undefined);

        beforeEach(() => {
            S3Operations.mockImplementation(() => ({
                uploadImage: uploadImageMock,
            }));
            getEnvVariable.mockReturnValue(bucketName);
        });

        it('should throw an error if key is not present in body', async () => {
            // Arrange
            const event = {
                body: '{"imageData": "SGVsbG8gV29ybGQ=", "contentType": "image/png"}',
            } as APIGatewayEvent;

            try {
                // Act
                await handleImagePost(event, env);
            } catch (error: any) {
                // Assert
                expect(error.message).toBe('key is a mandatory path param');
                expect(S3Operations).not.toHaveBeenCalled();
                expect(uploadImageMock).not.toHaveBeenCalled();
            }
        });

        it('should throw an error if imageData is not present in body', async () => {
            // Arrange
            const event = {
                body: '{"key": "image-key", "contentType": "image/png"}',
            } as APIGatewayEvent;

            try {
                // Act
                await handleImagePost(event, env);
            } catch (error: any) {
                // Assert
                expect(error.message).toBe('imageData is a mandatory path param');
                expect(S3Operations).not.toHaveBeenCalled();
                expect(uploadImageMock).not.toHaveBeenCalled();
            }
        });

        it('should throw an error if contentType is not present in body', async () => {
            // Arrange
            const event = {
                body: '{"key": "image-key", "imageData": "SGVsbG8gV29ybGQ="}',
            } as APIGatewayEvent;

            try {
                // Act
                await handleImagePost(event, env);
            } catch (error: any) {
                // Assert
                expect(error.message).toBe('contentType is a mandatory path param');
                expect(S3Operations).not.toHaveBeenCalled();
                expect(uploadImageMock).not.toHaveBeenCalled();
            }
        });

        it('should upload the image to S3 on success', async () => {
            // Arrange
            const event = {
                body: '{"key": "image-key", "imageData": "SGVsbG8gV29ybGQ=", "contentType": "image/png"}',
            } as APIGatewayEvent;

            // Act
            await handleImagePost(event, env);

            // Assert
            expect(S3Operations).toHaveBeenCalledWith(bucketName);
            expect(uploadImageMock).toHaveBeenCalledWith(Buffer.from('Hello World'), 'image-key', 'image/png');
        });
    });

    describe('handleImagePut', () => {
        const uploadImageMock = jest.fn().mockResolvedValue(undefined);

        beforeEach(() => {
            S3Operations.mockImplementation(() => ({
                uploadImage: uploadImageMock,
            }));
            getEnvVariable.mockReturnValue(bucketName);
        });

        it('should throw an error if key is not present in body', async () => {
            // Arrange
            const event = {
                body: '{"imageData": "SGVsbG8gV29ybGQ=", "contentType": "image/png"}',
            } as APIGatewayEvent;

            try {
                // Act
                await handleImagePut(event, env);
            } catch (error: any) {
                // Assert
                expect(error.message).toBe('key is a mandatory path param');
                expect(S3Operations).not.toHaveBeenCalled();
                expect(uploadImageMock).not.toHaveBeenCalled();
            }
        });

        it('should throw an error if imageData is not present in body', async () => {
            // Arrange
            const event = {
                body: '{"key": "image-key", "contentType": "image/png"}',
            } as APIGatewayEvent;

            try {
                // Act
                await handleImagePut(event, env);
            }
            catch (error: any) { // Assert
                expect(error.message).toBe('imageData is a mandatory path param');
                expect(S3Operations).not.toHaveBeenCalled();
                expect(uploadImageMock).not.toHaveBeenCalled();
            }
        });
        it('should throw an error if contentType is not present in body', async () => {
            // Arrange
            const event = {
                body: '{"key": "image-key", "imageData": "SGVsbG8gV29ybGQ="}',
            } as APIGatewayEvent;

            try {
                // Act
                await handleImagePut(event, env);
            } catch (error: any) {
                // Assert
                expect(error.message).toBe('contentType is a mandatory path param');
                expect(S3Operations).not.toHaveBeenCalled();
                expect(uploadImageMock).not.toHaveBeenCalled();
            }
        });

        it('should upload the image to S3 on success', async () => {
            // Arrange
            const event = {
                body: '{"key": "image-key", "imageData": "SGVsbG8gV29ybGQ=", "contentType": "image/png"}',
            } as APIGatewayEvent;

            // Act
            await handleImagePut(event, env);

            // Assert
            expect(S3Operations).toHaveBeenCalledWith(bucketName);
            expect(uploadImageMock).toHaveBeenCalledWith(Buffer.from('Hello World'), 'image-key', 'image/png');
        });
    });
});