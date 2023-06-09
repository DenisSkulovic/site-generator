import { handlePageContentDelete, handlePageContentGet, handlePageContentPost, handlePageContentPut } from '../';
import { APIGatewayEvent } from 'aws-lambda';
import { PageContentRepository } from '@repository_module';
import { PageContent } from '@page_cls_module';

jest.mock('@repository_module');

describe('handlePageContentDelete', () => {
    it('should throw an error if key is undefined', async () => {
        const mockEvent: APIGatewayEvent = {
            pathParameters: {},
        } as unknown as APIGatewayEvent;

        await expect(handlePageContentDelete(mockEvent, 'dev')).rejects.toThrow('key is a mandatory path param');
    });

    it('should call PageContentRepository deleteItem with the correct key', async () => {
        const mockEvent: APIGatewayEvent = {
            pathParameters: { key: 'abc123' },
        } as unknown as APIGatewayEvent;

        const mockDeleteItem = jest.fn();
        (PageContentRepository as jest.MockedClass<typeof PageContentRepository>).mockImplementation(() => {
            return {
                deleteItem: mockDeleteItem,
            };
        });

        await handlePageContentDelete(mockEvent, 'dev');

        expect(mockDeleteItem).toHaveBeenCalledWith('abc123');
    });
});

describe('handlePageContentGet', () => {
    it('should throw an error if key is undefined', async () => {
        const mockEvent: APIGatewayEvent = {
            pathParameters: {},
        } as unknown as APIGatewayEvent;

        await expect(handlePageContentGet(mockEvent, 'dev')).rejects.toThrow('key is a mandatory path param');
    });

    it('should call PageContentRepository getItem with the correct key', async () => {
        const mockEvent: APIGatewayEvent = {
            pathParameters: { key: 'abc123' },
        } as unknown as APIGatewayEvent;

        const mockGetItem = jest.fn().mockReturnValue({ id: 'abc123', content: 'test' });
        (PageContentRepository as jest.MockedClass<typeof PageContentRepository>).mockImplementation(() => {
            return {
                getItem: mockGetItem,
            };
        });

        const result: PageContent = await handlePageContentGet(mockEvent, 'dev');

        expect(mockGetItem).toHaveBeenCalledWith('abc123');
        expect(result).toEqual({ id: 'abc123', content: 'test' });
    });
});

describe('handlePageContentPost', () => {
    it('should call PageContentRepository putItem with the correct item', async () => {
        const mockEvent: APIGatewayEvent = {
            body: JSON.stringify({ id: 'abc123', content: 'test' }),
        } as unknown as APIGatewayEvent;

        const mockPutItem = jest.fn();
        (PageContentRepository as jest.MockedClass<typeof PageContentRepository>).mockImplementation(() => {
            return {
                putItem: mockPutItem,
            };
        });

        await handlePageContentPost(mockEvent, 'dev');

        expect(mockPutItem).toHaveBeenCalledWith({ id: 'abc123', content: 'test' });
    });
});

describe('handlePageContentPut', () => {
    it('should call PageContentRepository putItem with the correct item', async () => {
        const mockEvent: APIGatewayEvent = {
            body: JSON.stringify({ id: 'abc123', content: 'test' }),
        } as unknown as APIGatewayEvent;

        const mockPutItem = jest.fn();
        (PageContentRepository as jest.MockedClass<typeof PageContentRepository>).mockImplementation(() => {
            return {
                putItem: mockPutItem,
            };
        });

        await handlePageContentPut(mockEvent, 'dev');

        expect(mockPutItem).toHaveBeenCalledWith({ id: 'abc123', content: 'test' });
    });
});
