"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const __1 = require("../");
const _repository_module_1 = require("@repository_module");
jest.mock('@repository_module');
describe('handlePageContentDelete', () => {
    it('should throw an error if key is undefined', async () => {
        const mockEvent = {
            pathParameters: {},
        };
        await expect((0, __1.handlePageContentDelete)(mockEvent, 'dev')).rejects.toThrow('key is a mandatory path param');
    });
    it('should call PageContentRepository deleteItem with the correct key', async () => {
        const mockEvent = {
            pathParameters: { key: 'abc123' },
        };
        const mockDeleteItem = jest.fn();
        _repository_module_1.PageContentRepository.mockImplementation(() => {
            return {
                deleteItem: mockDeleteItem,
            };
        });
        await (0, __1.handlePageContentDelete)(mockEvent, 'dev');
        expect(mockDeleteItem).toHaveBeenCalledWith('abc123');
    });
});
describe('handlePageContentGet', () => {
    it('should throw an error if key is undefined', async () => {
        const mockEvent = {
            pathParameters: {},
        };
        await expect((0, __1.handlePageContentGet)(mockEvent, 'dev')).rejects.toThrow('key is a mandatory path param');
    });
    it('should call PageContentRepository getItem with the correct key', async () => {
        const mockEvent = {
            pathParameters: { key: 'abc123' },
        };
        const mockGetItem = jest.fn().mockReturnValue({ id: 'abc123', content: 'test' });
        _repository_module_1.PageContentRepository.mockImplementation(() => {
            return {
                getItem: mockGetItem,
            };
        });
        const result = await (0, __1.handlePageContentGet)(mockEvent, 'dev');
        expect(mockGetItem).toHaveBeenCalledWith('abc123');
        expect(result).toEqual({ id: 'abc123', content: 'test' });
    });
});
describe('handlePageContentPost', () => {
    it('should call PageContentRepository putItem with the correct item', async () => {
        const mockEvent = {
            body: JSON.stringify({ id: 'abc123', content: 'test' }),
        };
        const mockPutItem = jest.fn();
        _repository_module_1.PageContentRepository.mockImplementation(() => {
            return {
                putItem: mockPutItem,
            };
        });
        await (0, __1.handlePageContentPost)(mockEvent, 'dev');
        expect(mockPutItem).toHaveBeenCalledWith({ id: 'abc123', content: 'test' });
    });
});
describe('handlePageContentPut', () => {
    it('should call PageContentRepository putItem with the correct item', async () => {
        const mockEvent = {
            body: JSON.stringify({ id: 'abc123', content: 'test' }),
        };
        const mockPutItem = jest.fn();
        _repository_module_1.PageContentRepository.mockImplementation(() => {
            return {
                putItem: mockPutItem,
            };
        });
        await (0, __1.handlePageContentPut)(mockEvent, 'dev');
        expect(mockPutItem).toHaveBeenCalledWith({ id: 'abc123', content: 'test' });
    });
});
//# sourceMappingURL=page-content.spec.js.map