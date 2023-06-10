import axios from 'axios';
import { GenerateHeaderRequest, GenerateFooterRequest, GeneratePageRequest, HeaderConfig, HeaderContent, FooterContent, FooterConfig, PageContent, PageConfig, GenerateHeaderResponse, GenerateFooterResponse, GeneratePageResponse } from '@page_cls_module';
import { PageGenerator } from '../PageGenerator';
import { createFooterConfig, createFooterContent, createGenerateFooterRequest, createGenerateFooterResponse, createGenerateHeaderRequest, createGenerateHeaderResponse, createGeneratePageRequest, createGeneratePageResponse, createHeaderConfig, createHeaderContent, createPageConfig, createPageContent } from '../../../../../page_cls_module/src/mockFactories';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PageGenerator', () => {
    let pageGenerator: PageGenerator;
    const mockEnv = 'dev';
    const mockUrl = 'http://mock-url.com';

    beforeEach(() => {
        process.env.PAGE_GENERATOR_DEV = mockUrl;
        pageGenerator = new PageGenerator(mockEnv);
    });

    it('should create an instance with the correct URL', () => {
        expect(pageGenerator).toBeDefined();
        expect(PageGenerator.getPageGeneratorUrl(mockEnv)).toBe(mockUrl);
    });

    it('should call generateHeader correctly', async () => {
        const mockHeaderContent: HeaderContent = createHeaderContent({});
        const mockHeaderConfig: HeaderConfig = createHeaderConfig({});
        const mockGenerateHeaderRequest: GenerateHeaderRequest = createGenerateHeaderRequest({content: mockHeaderContent, config: mockHeaderConfig});
        const mockGenerateHeaderResponse: GenerateHeaderResponse = createGenerateHeaderResponse({});

        mockedAxios.post.mockResolvedValue({ data: mockGenerateHeaderResponse });

        const response = await pageGenerator.generateHeader(mockHeaderContent, mockHeaderConfig);

        expect(mockedAxios.post).toHaveBeenCalledWith(
            `${mockUrl}/generate-header`,
            mockGenerateHeaderRequest,
            {
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );

        expect(response).toEqual(mockGenerateHeaderResponse);
    });

    it('should call generateFooter correctly', async () => {
        const mockFooterContent: FooterContent = createFooterContent({});
        const mockFooterConfig: FooterConfig = createFooterConfig({});
        const mockGenerateFooterRequest: GenerateFooterRequest = createGenerateFooterRequest({content: mockFooterContent, config: mockFooterConfig});
        const mockGenerateFooterResponse: GenerateFooterResponse = createGenerateFooterResponse({});

        mockedAxios.post.mockResolvedValue({ data: mockGenerateFooterResponse });

        const response = await pageGenerator.generateFooter(mockFooterContent, mockFooterConfig);

        expect(mockedAxios.post).toHaveBeenCalledWith(
            `${mockUrl}/generate-footer`,
            mockGenerateFooterRequest,
            {
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );

        expect(response).toEqual(mockGenerateFooterResponse);
    });

    it('should call generatePage correctly', async () => {
        const mockPageContent: PageContent = createPageContent({});
        const mockPageConfig: PageConfig = createPageConfig({});
        const mockGeneratePageRequest: GeneratePageRequest = createGeneratePageRequest({content: mockPageContent, config: mockPageConfig});
        const mockGeneratePageResponse: GeneratePageResponse = createGeneratePageResponse({});

        mockedAxios.post.mockResolvedValue({ data: mockGeneratePageResponse });

        const response = await pageGenerator.generatePage(mockPageContent, mockPageConfig);

        expect(mockedAxios.post).toHaveBeenCalledWith(
            `${mockUrl}/generate-page`,
            mockGeneratePageRequest,
            {
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );

        expect(response).toEqual(mockGeneratePageResponse);
    });
});
