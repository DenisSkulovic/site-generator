import { siteConfigEdit, siteConfigCurrent } from "@/state/configState"
import { AdminService } from "./AdminService"
import {cloneDeep} from "lodash"
import {isSiteConfigEdited} from "@/computed/site-config"
import axios from "axios"

export class SiteConfigService extends AdminService {

    constructor(adminUrl: string) {
        super(adminUrl)
    }

    resetSiteConfig() {
        siteConfigEdit.value = cloneDeep(siteConfigCurrent.value)
    }

    async fetchSiteConfig(force = false) {
        if (!force && siteConfigCurrent.value) return
        const url = `${this.adminUrl}/site-config`
        const {data} = await axios.get(url)
        siteConfigCurrent.value = data
    }

    async saveSiteConfig() {
        if (!siteConfigEdit.value) throw new Error("siteConfigEdit.value cannot be undefined")
        const url = `${this.adminUrl}/site-config`
        const {data} = await axios.put(url)
        siteConfigCurrent.value = data
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