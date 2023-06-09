import getDirName from '@/utils/getDirName';
import guid from '@/utils/guid';
import * as ejs from 'ejs';
import { createFooterConfig, createFooterContent } from '../../../../../../../page_cls_module/src/mockFactories';
import generateFooterHTML from '../generateFooterHTML';

jest.mock('ejs', () => ({
    renderFile: jest.fn(),
}));
jest.mock('../../../utils/guid', () => jest.fn());
jest.mock('../../../utils/getDirName', () => jest.fn());

describe('generateFooterHTML', () => {
    it('generates FooterHTMLObject', async () => {
        (ejs.renderFile as jest.Mock).mockResolvedValue('<div>Mock Footer</div>');
        (guid as jest.Mock).mockReturnValue('guid');
        (getDirName as jest.Mock).mockReturnValue('/mock/directory');
        const footerConfig = createFooterConfig({});
        const footerContent = createFooterContent({});

        const footerHTMLObject = await generateFooterHTML(footerConfig, footerContent);
        
        expect(footerHTMLObject).toBeDefined();
        expect(footerHTMLObject.html).toEqual('<div>Mock Footer</div>');

        // additional assertions
        expect(footerHTMLObject.uuid).toEqual('guid');  // assuming 'guid' function is used for uuid generation
        expect(footerHTMLObject.config).toEqual(footerConfig);
        expect(footerHTMLObject.content).toEqual(footerContent);
        expect(ejs.renderFile).toHaveBeenCalledWith(expect.stringContaining('/templates/html'), expect.any(Object)); // check if ejs.renderFile is called with expected templatePath
        expect(getDirName).toHaveBeenCalled(); // check if getDirName is called
        expect(guid).toHaveBeenCalled(); // check if guid is called
        expect(footerHTMLObject.metadata).toBeDefined();  // assuming that metadata object should be defined
        expect(footerHTMLObject.metadata.createdTimestamp).toBeDefined();  // assuming that createdTimestamp should be defined
        expect(footerHTMLObject.metadata.updatedTimestamp).toBeDefined();  // assuming that updatedTimestamp should be defined
    });
});
