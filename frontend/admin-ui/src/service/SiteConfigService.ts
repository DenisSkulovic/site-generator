import { siteConfigEdit, siteConfigCurrent } from "@/state/configState"
import { AdminService } from "./AdminService"
import {cloneDeep} from "lodash"
import {isSiteConfigEdited} from "@/computed/site-config"
import axios from "axios"
import { buildSiteConfig, type SiteConfig } from "../../../../admin_cls_module/src"

export class SiteConfigService extends AdminService {

    constructor(adminUrl: string) {
        super(adminUrl)
    }

    resetSiteConfig() {
        siteConfigEdit.value = cloneDeep(siteConfigCurrent.value)
    }

    async fetchSiteConfig(force = false): Promise<SiteConfig | undefined> {
        if (!force && siteConfigCurrent.value) return
        const url = `${this.adminUrl}/site-config`
        const {data} = await axios.get(url)
        return buildSiteConfig(data)
    }

    async getSiteConfig(force = false): Promise<void> {
        if (!force && siteConfigCurrent.value) return
        const siteConfig: SiteConfig | undefined = await this.fetchSiteConfig(force)
        if (!siteConfig) throw new Error("failed to get site config")
        siteConfigCurrent.value = siteConfig
        this.resetSiteConfig()
    }

    async saveSiteConfig() {
        if (!siteConfigEdit.value) throw new Error("siteConfigEdit.value cannot be undefined")
        const url = `${this.adminUrl}/site-config`
        const {data} = await axios.put(url)
        siteConfigCurrent.value = data
    }
    
    async uploadDesignSystemCSS(file: File) {
        const formData = new FormData();
        formData.append('file', file);
    
        const response = await fetch(this.adminUrl + '/design-system', {
            method: 'PUT',
            body: formData
        });
    
        if (!response.ok) {
            throw new Error('Failed to upload design system CSS');
        }
    }

}