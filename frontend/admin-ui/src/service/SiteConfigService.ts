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
    
}