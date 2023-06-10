import { siteConfigEdit, siteConfigCurrent } from "@/state/configState"
import s3 from "@/state/s3"
import { AdminService } from "./AdminService"
import {cloneDeep} from "vue"
import {isSiteConfigEdited} from "@/computed/site-config"

export class SiteConfigService extends AdminService {

    constructor(adminUrl: string) {
        super(adminUrl)
    }

    resetSiteConfig() {
        siteConfigEdit.value = cloneDeep(siteConfigCurrent.value)
    }

    async fetchSiteConfig(force = false) {
        if (!force && siteConfigCurrent.value) return
        siteConfigCurrent.value = await s3.value.getJson("site-config")
    }

    async saveSiteConfig() {
        if (!siteConfigEdit.value) throw new Error("siteConfigEdit.value cannot be undefined")
        await s3.value.putJson("site-config", siteConfigEdit.value)
        siteConfigCurrent.value = cloneDeep(siteConfigEdit.value)
    }

    async downloadDesignSystemCSS() {
        const response = await fetch(this.adminUrl + '/design-system', {
            method: 'GET',
        });
    
        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'design-system.css');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } else {
            throw new Error('Failed to download design system CSS');
        }
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