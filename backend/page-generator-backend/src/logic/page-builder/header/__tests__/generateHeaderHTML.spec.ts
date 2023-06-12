// @ts-nocheck
import getDirName from '@/utils/getDirName';
import guid from '@/utils/guid';
import * as ejs from 'ejs';
import { createHeaderConfig, createHeaderContent } from '../../../../../../../page_cls_module/src/mockFactories';
import generateHeaderHTML from '../../header/generateHeaderHTML';

jest.mock('ejs', () => ({
    renderFile: jest.fn(),
}));
jest.mock('../../../utils/guid', () => jest.fn());
jest.mock('../../../utils/getDirName', () => jest.fn());

describe('generateHeaderHTML', () => {
    it('generates HeaderHTMLObject', async () => {
        (ejs.renderFile as jest.Mock).mockResolvedValue('<div>Mock Header</div>');
        (guid as jest.Mock).mockReturnValue('guid');
        (getDirName as jest.Mock).mockReturnValue('/mock/directory');
        const headerConfig = createHeaderConfig({});
        const headerContent = createHeaderContent({});

        const headerHTMLObject = await generateHeaderHTML(headerConfig, headerContent);
        
        expect(headerHTMLObject).toBeDefined();
        expect(headerHTMLObject.html).toEqual('<div>Mock Header</div>');

        // additional assertions
        expect(headerHTMLObject.uuid).toEqual('guid');  // assuming 'guid' function is used for uuid generation
        expect(headerHTMLObject.config).toEqual(headerConfig);
        expect(headerHTMLObject.content).toEqual(headerContent);
        expect(ejs.renderFile).toHaveBeenCalledWith(expect.stringContaining('/templates/html'), expect.any(Object)); // check if ejs.renderFile is called with expected templatePath
        expect(getDirName).toHaveBeenCalled(); // check if getDirName is called
        expect(guid).toHaveBeenCalled(); // check if guid is called
        expect(headerHTMLObject.metadata).toBeDefined();  // assuming that metadata object should be defined
        expect(headerHTMLObject.metadata.createdTimestamp).toBeDefined();  // assuming that createdTimestamp should be defined
        expect(headerHTMLObject.metadata.updatedTimestamp).toBeDefined();  // assuming that updatedTimestamp should be defined
    });
});
