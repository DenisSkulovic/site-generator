import { PageService } from './PageService';
import { pagesCurrent, pagesEdit } from '@/state/pages';
import { createPageHTMLObject } from '../../../../../page_cls_module/src/mockFactories';
import axios from 'axios';

jest.mock('axios');
jest.mock('@/state/pages');

describe('PageService', () => {
    const adminUrl = 'http://localhost';
    let pageService: PageService;

    beforeEach(() => {
        pageService = new PageService(adminUrl);
    });

    it('should fetch PageHTMLObject', async () => {
        const pageHTMLObject = createPageHTMLObject({ uuid: 'uuid1' });
        axios.get.mockResolvedValue({ data: pageHTMLObject });
        const result = await pageService.fetchPageHTMLObject('uuid1');
        expect(result).toEqual(pageHTMLObject);
    });

    it('should fetch all PageHTMLObjects', async () => {
        const pageHTMLObjects = [createPageHTMLObject({ uuid: 'uuid1' }), createPageHTMLObject({ uuid: 'uuid2' })];
        axios.get.mockResolvedValue({ data: pageHTMLObjects });
        const result = await pageService.fetchPageHTMLObjectAll();
        expect(result).toEqual(pageHTMLObjects);
    });

    it('should get all PageHTMLObjects', async () => {
        const pageHTMLObjects = [createPageHTMLObject({ uuid: 'uuid1' }), createPageHTMLObject({ uuid: 'uuid2' })];
        pageService.fetchPageHTMLObjectAll = jest.fn().mockResolvedValue(pageHTMLObjects);
        await pageService.getPageHTMLObjectAll();
        expect(pagesCurrent.value).toEqual(pageHTMLObjects);
        expect(pagesEdit.value).toEqual(pageHTMLObjects);
    });

    it('should throw error when publishPage is called', async () => {
        const pageHTMLObject = createPageHTMLObject({ uuid: 'uuid1' });
        await expect(pageService.publishPage(pageHTMLObject)).rejects.toThrow('NOT IMPLEMENTED');
    });

    it('should throw error when unpublishPage is called', async () => {
        const pageHTMLObject = createPageHTMLObject({ uuid: 'uuid1' });
        await expect(pageService.unpublishPage(pageHTMLObject)).rejects.toThrow('NOT IMPLEMENTED');
    });

    it('should throw error when regeneratePage is called', async () => {
        const pageHTMLObject = createPageHTMLObject({ uuid: 'uuid1' });
        await expect(pageService.regeneratePage(pageHTMLObject)).rejects.toThrow('NOT IMPLEMENTED');
    });

    it('should throw error when regenerateAll is called', async () => {
        await expect(pageService.regenerateAll()).rejects.toThrow('NOT IMPLEMENTED');
    });
});
