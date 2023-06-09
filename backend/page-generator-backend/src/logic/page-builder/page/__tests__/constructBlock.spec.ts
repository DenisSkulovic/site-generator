import constructBlock, { getTemplatePath, buildBlockHTMLObject, buildRenderDataBlock, renderEjsFile } from '../constructBlock'; // Update with the path to your module
import { BlockConfig, BlockContent, BlockHTMLMetadata, BlockHTMLObject, BlockTemplateEnum, BootstrapVersionEnum } from "@page_cls_module";
import { RenderData_Block } from "@/classes/renderData/blocks/RenderData_Block";
import ejs from 'ejs';
import { createBlockConfig, createBlockContent, createBlockHTMLMetadata, createMetadata } from '../../../../../../../page_cls_module/src/mockFactories';
import getDirName from '@/utils/getDirName';
import guid from '@/utils/guid';

jest.mock('ejs', () => ({
    renderFile: jest.fn(),
}));

jest.mock('../../../utils/guid', () => jest.fn());
jest.mock('../../../utils/getDirName', () => jest.fn());


describe("getTemplatePath", () => {
    test("Should return the correct template path", () => {
        const __dirname = '/some/dir';
        const bootstrapVersion = BootstrapVersionEnum.BOOTSTRAP_5_0_2;
        const blockTemplateName = BlockTemplateEnum.HTML;

        const templatePath = getTemplatePath(__dirname, bootstrapVersion, blockTemplateName);

        expect(templatePath).toBe('/some/dir/templates/html/VERSION_4/blocks/SOME_TEMPLATE/index.ejs');
    });
});

describe("buildBlockHTMLObject", () => {
    test("Should return a BlockHTMLObject instance", async () => {
        const uuid = '123';
        const blockHtml = '<p>Some HTML</p>';
        const blockConfig = createBlockConfig({});
        const blockContent = createBlockContent({});
        const blockMetadata = createMetadata({});

        const blockHTMLObject = await buildBlockHTMLObject(uuid, blockHtml, blockConfig, blockContent, blockMetadata);

        expect(blockHTMLObject).toBeInstanceOf(BlockHTMLObject);
        expect(blockHTMLObject.html).toBe(blockHtml);
        expect(blockHTMLObject.config).toBe(blockConfig);
        expect(blockHTMLObject.content).toBe(blockContent);
        expect(blockHTMLObject.metadata).toBe(blockMetadata);
    });

    test("Should throw an error when parameters are not valid", async () => {
        // Testing for parameters being null
        await expect(buildBlockHTMLObject(null as unknown as string, null as unknown as string, null as unknown as BlockConfig, null as unknown as BlockContent, null as unknown as BlockHTMLMetadata)).rejects.toThrowError();

        // Testing for parameters being undefined
        await expect(buildBlockHTMLObject(undefined as unknown as string, undefined as unknown as string, undefined as unknown as BlockConfig, undefined as unknown as BlockContent, undefined as unknown as BlockHTMLMetadata)).rejects.toThrowError();
    });
});

describe("buildRenderDataBlock", () => {
    test("Should return a RenderData_Block instance", () => {
        const blockConfig = createBlockConfig({});
        const blockContent = createBlockContent({});

        const renderDataBlock = buildRenderDataBlock(blockContent, blockConfig);

        expect(renderDataBlock).toBeInstanceOf(RenderData_Block);
    });

    test("Should throw an error when parameters are not valid", () => {
        // Testing for parameters being null
        expect(() => buildRenderDataBlock(null as unknown as BlockContent, null as unknown as BlockConfig)).toThrowError();

        // Testing for parameters being undefined
        expect(() => buildRenderDataBlock(undefined as unknown as BlockContent, undefined as unknown as BlockConfig)).toThrowError();
    });
});



jest.mock('ejs', () => {
    return {
        renderFile: jest.fn(),
    };
});

jest.mock('fs');

describe("renderEjsFile", () => {
    test("Should return the correct HTML string", async () => {
        (ejs.renderFile as jest.Mock).mockResolvedValue('<p>Rendered HTML</p>');
        const templatePath = '/valid/path';
        const renderDataBlock = new RenderData_Block(createBlockContent({}), createBlockConfig({}));

        const result = await renderEjsFile(templatePath, renderDataBlock);

        expect(result).toBe('<p>Rendered HTML</p>');
    });

    test("Should throw an error when template path does not exist", async () => {
        const templatePath = '/invalid/path';
        const renderDataBlock = new RenderData_Block(createBlockContent({}), createBlockConfig({}));

        await expect(renderEjsFile(templatePath, renderDataBlock)).rejects.toThrow();
    });
});


describe('constructBlock', () => {
    test('Should return a BlockHTMLObject instance', async () => {
        const blockContent = createBlockContent({});
        const blockConfig = createBlockConfig({});
        const __dirname = '/valid/dir';
        const bootstrapVersion = BootstrapVersionEnum.BOOTSTRAP_5_0_2;
        const blockTemplateName = BlockTemplateEnum.HTML;
        const uuid = '1234';
        const createdTimestamp = Date.now();
        const updatedTimestamp = createdTimestamp;
        const blockHtml = '<p>Some HTML</p>';

        // Mock implementations
        (guid as jest.Mock).mockReturnValue(uuid);
        (getDirName as jest.Mock).mockReturnValue(__dirname);
        (ejs.renderFile as jest.Mock).mockResolvedValue(blockHtml);

        const blockMetadata = createBlockHTMLMetadata({ createdTimestamp, updatedTimestamp });
        const expectedBlockHTMLObject = buildBlockHTMLObject(uuid, blockHtml, blockConfig, blockContent, blockMetadata);

        const blockHTMLObject = await constructBlock(blockContent, blockConfig);

        expect(blockHTMLObject).toEqual(expectedBlockHTMLObject);
    });

    test('Should throw an error when blockContent or blockConfig are not valid', async () => {
        const blockContent = createBlockContent({});
        const blockConfig = createBlockConfig({});

        // Testing for blockContent being null
        await expect(constructBlock(null as unknown as BlockContent, blockConfig)).rejects.toThrowError();

        // Testing for blockContent being undefined
        await expect(constructBlock(undefined as unknown as BlockContent, blockConfig)).rejects.toThrowError();

        // Testing for blockConfig being null
        await expect(constructBlock(blockContent, null as unknown as BlockConfig)).rejects.toThrowError();

        // Testing for blockConfig being undefined
        await expect(constructBlock(blockContent, undefined as unknown as BlockConfig)).rejects.toThrowError();
    });
});
