import { footerConfigEdit, footerConfigCurrent } from "@/state/configState";
import { footerContentEdit, footerContentCurrent } from "@/state/contentState";
import s3 from "@/state/s3";
import { beforeEach } from "node:test";
import { FooterService } from "../FooterService";
import {cloneDeep} from "lodash"
import { FooterTemplateVersionEnum } from "@page_cls_module";
import { createFooterConfig, createFooterContent } from "../../../../../page_cls_module/src/mockFactories";
import axios from "axios"

describe('FooterService', () => {
    const adminUrl = 'http://localhost:3000';
    let footerService: FooterService;

    beforeEach(() => {
        (axios.get as jest.Mock).mockReset();
        (s3.value.putJson as jest.Mock).mockReset();
        footerService = new FooterService(adminUrl);
        footerConfigCurrent.value = createFooterConfig({})
        footerConfigEdit.value = cloneDeep(footerConfigCurrent.value)
        footerContentCurrent.value = createFooterContent({})
        footerContentEdit.value = cloneDeep(footerContentCurrent.value)
    });

    // Other test cases stay the same

    test('saveFooterConfig without edits', async () => {
        await footerService.saveFooterConfig();
        expect(s3.value.putJson).not.toHaveBeenCalled();
    });

    test('saveFooterConfig with edits', async () => {
        footerConfigEdit.value!.templateVersion = FooterTemplateVersionEnum.TEST_VERSION_2
        await footerService.saveFooterConfig();
        expect(s3.value.putJson).toHaveBeenCalledWith('footer-config', footerConfigEdit.value);
    });

    test('saveFooterContent without edits', async () => {
        await footerService.saveFooterContent();
        expect(s3.value.putJson).not.toHaveBeenCalled();
    });

    test('saveFooterContent with edits', async () => {
        footerContentEdit.value!.email = "test@test.com";
        await footerService.saveFooterContent();
        expect(s3.value.putJson).toHaveBeenCalledWith('footer-content', footerContentEdit.value);
    });

    test('regenerateFooter with unsaved changes', async () => {
        footerConfigEdit.value!.templateVersion = FooterTemplateVersionEnum.TEST_VERSION_2;
        await expect(footerService.regenetareFooter()).rejects.toThrow("cannot generate footer when it isn't saved");
    });

    test('regenerateFooter without unsaved changes', async () => {
        await expect(footerService.regenetareFooter()).rejects.toThrow("NOT IMPLEMENTED");
    });
});
