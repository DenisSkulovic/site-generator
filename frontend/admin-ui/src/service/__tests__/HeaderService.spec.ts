import { HeaderService } from './HeaderService';
import s3 from '@/state/s3';
import { headerConfigCurrent, headerConfigEdit } from '@/state/configState';
import { headerContentCurrent, headerContentEdit } from '@/state/contentState';
import { createHeaderConfig, createHeaderContent, createNavItem } from '../../../../../page_cls_module/src/mockFactories';
import { BootstrapVersionEnum, HeaderTemplateVersionEnum } from '../../../../../page_cls_module/src';

jest.mock('@/state/s3');
jest.mock('@/state/configState');

describe('HeaderService', () => {
    const adminUrl = 'http://localhost';
    let headerService: HeaderService;

    beforeEach(() => {
        headerService = new HeaderService(adminUrl);
    });

    it('should reset links', () => {
        headerContentCurrent.value = createHeaderContent({
            navItems: [createNavItem({ url: 'link1', label: 'text1' })]
        });
        headerContentEdit.value = createHeaderContent({
            navItems: []
        });
        headerService.resetLinks();
        expect(headerContentEdit.value.navItems).toEqual(headerContentCurrent.value.navItems);
    });

    it('should add link', () => {
        headerContentEdit.value = createHeaderContent({
            navItems: []
        });
        headerService.addLink();
        expect(headerContentEdit.value.navItems.length).toBe(1);
    });

    it('should delete link', () => {
        headerContentEdit.value = createHeaderContent({
            navItems: [createNavItem({ url: 'link1', label: 'text1' }), createNavItem({ url: 'link2', label: 'text2' })]
        });
        headerService.deleteLink(0);
        expect(headerContentEdit.value.navItems.length).toBe(1);
    });

    it('should reset header', () => {
        headerConfigCurrent.value = createHeaderConfig({
            uuid: 'uuid1',
            templateVersion: HeaderTemplateVersionEnum.TEST_VERSION,
            bootstrapVersion: BootstrapVersionEnum.BOOTSTRAP_5_0_2
        });
        headerConfigEdit.value = null;
        headerContentCurrent.value = createHeaderContent({
            navItems: [createNavItem({ url: 'link1', label: 'text1' })]
        });
        headerContentEdit.value = null;
        headerService.resetHeader();
        expect(headerConfigEdit.value).toEqual(headerConfigCurrent.value);
        expect(headerContentEdit.value).toEqual(headerContentCurrent.value);
    });

    it('should fetch header config', async () => {
        const config = createHeaderConfig({
            uuid: 'uuid1',
            templateVersion: HeaderTemplateVersionEnum.TEST_VERSION,
            bootstrapVersion: BootstrapVersionEnum.BOOTSTRAP_5_0_2
        });
        s3.value.getJson.mockResolvedValue(config);
        await headerService.fetchHeaderConfig(true);
        expect(headerConfigCurrent.value).toEqual(config);
    });

    it('should fetch header content', async () => {
        const content = createHeaderContent({
            navItems: [createNavItem({ url: 'link1', label: 'text1' })]
        });
        s3.value.getJson.mockResolvedValue(content);
        await headerService.fetchHeaderContent(true);
        expect(headerContentCurrent.value).toEqual(content);
    });

    it('should save header config', async () => {
        const config = createHeaderConfig({
            uuid: 'uuid1',
            templateVersion: HeaderTemplateVersionEnum.TEST_VERSION,
            bootstrapVersion: BootstrapVersionEnum.BOOTSTRAP_5_0_2
        });
        headerConfigEdit.value = config;
        await headerService.saveHeaderConfig();
        expect(s3.value.putJson).toHaveBeenCalled();
        expect(headerConfigCurrent.value).toEqual(config);
    });

    it('should save header content', async () => {
        const content = createHeaderContent({
            navItems: [createNavItem({ url: 'link1', label: 'text1' })]
        });
        headerContentEdit.value = content;
        await headerService.saveHeaderContent();
        expect(s3.value.putJson).toHaveBeenCalled();
        expect(headerContentCurrent.value).toEqual(content);
    });

    it('should throw error on regenerate header when edited', async () => {
        headerContentCurrent.value = createHeaderContent({ navItems: [] });
        headerContentEdit.value = createHeaderContent({ navItems: [createNavItem({ url: 'link1', label: 'text1' })] });
        await expect(headerService.regenerateHeader()).rejects.toThrow('cannot generate header when it isn\'t saved');
    });
});
