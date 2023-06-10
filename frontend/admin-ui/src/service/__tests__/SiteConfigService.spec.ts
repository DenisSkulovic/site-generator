import { SiteConfigService } from '../SiteConfigService';
import s3 from '@/state/s3';
import { siteConfigCurrent, siteConfigEdit } from '@/state/configState';
import { createSiteConfig } from '../../../../../admin_cls_module/src/mockFactories';

jest.mock('@/state/s3');
jest.mock('@/state/configState');

describe('SiteConfigService', () => {
    const adminUrl = 'http://localhost';
    let siteConfigService: SiteConfigService;

    beforeEach(() => {
        siteConfigService = new SiteConfigService(adminUrl);
    });

    it('should reset site config', () => {
        siteConfigCurrent.value = createSiteConfig({});
        siteConfigEdit.value = null;
        siteConfigService.resetSiteConfig();
        expect(siteConfigEdit.value).toEqual(siteConfigCurrent.value);
    });

    it('should fetch site config', async () => {
        const config = createSiteConfig({});
        s3.value.getJson.mockResolvedValue(config);
        await siteConfigService.fetchSiteConfig(true);
        expect(siteConfigCurrent.value).toEqual(config);
    });

    it('should save site config', async () => {
        const config = createSiteConfig({});
        siteConfigEdit.value = config;
        await siteConfigService.saveSiteConfig();
        expect(s3.value.putJson).toHaveBeenCalled();
        expect(siteConfigCurrent.value).toEqual(config);
    });

    it('should throw error if siteConfigEdit.value is null', async () => {
        siteConfigEdit.value = null;
        await expect(siteConfigService.saveSiteConfig()).rejects.toThrow('siteConfigEdit.value cannot be undefined');
    });
});
