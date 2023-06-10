import { footerConfigCurrent, footerConfigEdit } from "@/state/configState"
import s3 from "@/state/s3"
import { AdminService } from "./AdminService"
import { cloneDeep } from "lodash"
import axios from "axios"
import { footerContentCurrent, footerContentEdit } from "@/state/contentState"

export class FooterService extends AdminService {

    constructor(adminUrl: string) {
        super(adminUrl)
    }

    resetFooter() {
        footerConfigEdit.value = cloneDeep(footerConfigCurrent.value)
        footerContentEdit.value = cloneDeep(footerContentCurrent.value)
    }

    async fetchFooterConfig(force = false) {
        if (!force && footerConfigCurrent.value) return
        const url = `${this.adminUrl}/footer-config`
        footerConfigCurrent.value = await axios.get(url)
    }

    async fetchFooterContent(force = false) {
        if (!force && footerContentCurrent.value) return
        const url = `${this.adminUrl}/footer-content`
        footerContentCurrent.value = await axios.get(url)
    }

    async saveFooterConfig() {
        if (!this.isFooterConfigEdited) return
        await s3.value.putJson("footer-config", footerConfigEdit.value)
        footerConfigCurrent.value = cloneDeep(footerConfigEdit.value)
    }

    async saveFooterContent() {
        if (!this.isFooterContentEdited) return
        await s3.value.putJson("footer-content", footerContentEdit.value)
        footerContentCurrent.value = cloneDeep(footerContentEdit.value)
    }

    async regenetareFooter() {
        if (this.isFooterEdited) throw new Error("cannot generate footer when it isn't saved")
        throw new Error("NOT IMPLEMENTER") // TODO
    }

    get isFooterContentEdited() {
        return JSON.stringify(footerContentCurrent.value) !== JSON.stringify(footerContentEdit.value)
    }
    get isFooterConfigEdited() {
        return JSON.stringify(footerConfigCurrent.value) !== JSON.stringify(footerConfigEdit.value)
    }
    get isFooterEdited() {
        return this.isFooterContentEdited || this.isFooterConfigEdited
    }

}