import { footerConfigCurrent, footerConfigEdit } from "@/state/configState"
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
        this.resetFooter()
    }

    async fetchFooterContent(force = false) {
        if (!force && footerContentCurrent.value) return
        const url = `${this.adminUrl}/footer-content`
        footerContentCurrent.value = await axios.get(url)
        this.resetFooter()
    }

    async saveFooterConfig() {
        if (!this.isFooterConfigEdited) return
        const url = `${this.adminUrl}/footer-config`
        const body = footerConfigEdit.value
        const params = {}
        const headers = {}
        footerConfigCurrent.value = await axios.put(
            url,
            body, {
                params,
                headers,
            },
        )
        footerConfigCurrent.value = cloneDeep(footerConfigEdit.value)
    }

    async saveFooterContent() {
        if (!this.isFooterContentEdited) return
        const url = `${this.adminUrl}/footer-content`
        const body = footerContentEdit.value
        const params = {}
        const headers = {}
        footerContentCurrent.value = await axios.put(
            url,
            body, {
                params,
                headers,
            },
        )
        footerContentCurrent.value = cloneDeep(footerContentEdit.value)    }

        async regenerateFooter() {
            if (this.isFooterEdited) throw new Error("cannot generate footer when it isn't saved")
            const url = `${this.adminUrl}/regenerate-footer`
            const params = {}
            const headers = {}
            await axios.get(
                url,
                {
                    params,
                    headers,
                },
            )
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