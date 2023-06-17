import { headerConfigEdit, headerConfigCurrent } from "@/state/configState"
import { AdminService } from "./AdminService"
import { cloneDeep } from "lodash"
import { headerContentEdit, headerContentCurrent } from "@/state/contentState"
import { NavItem } from "../../../../page_cls_module"
import axios from "axios"

export class HeaderService extends AdminService {

    constructor(adminUrl: string) {
        super(adminUrl)
    }

    resetLinks() {
        if (!headerContentCurrent.value) throw new Error("headerContentCurrent.value cannot be undefined")
        if (!headerContentEdit.value) throw new Error("headerContentEdit.value cannot be undefined")
        headerContentEdit.value.navItems = cloneDeep(headerContentCurrent.value.navItems)
    }

    addLink(index?: number) {
        if (!headerContentEdit.value) throw new Error("headerContentEdit.value cannot be undefined")
        const newItem: NavItem = new NavItem("", "")
        if (!index) headerContentEdit.value.navItems.push(newItem)
        else headerContentEdit.value.navItems.splice(index, 0, newItem)
    }

    deleteLink(index: number) {
        if (!headerContentEdit.value) throw new Error("headerContentEdit.value cannot be undefined")
        headerContentEdit.value.navItems = headerContentEdit.value.navItems.splice(index, 1)
    }

    resetHeader() {
        headerConfigEdit.value = cloneDeep(headerConfigCurrent.value)
        headerContentEdit.value = cloneDeep(headerContentCurrent.value)
    }

    async fetchHeaderConfig(force = false) {
        if (!force && headerConfigCurrent.value) return
        const url = `${this.adminUrl}/header-config`
        const { data } = await axios.get(url)
        headerConfigCurrent.value = data
        this.resetHeader()
    }

    async fetchHeaderContent(force = false) {
        if (!force && headerContentCurrent.value) return
        const url = `${this.adminUrl}/header-content`
        const { data } = await axios.get(url)
        headerContentCurrent.value = data
        this.resetHeader()
    }

    async saveHeaderConfig() {
        const url = `${this.adminUrl}/header-config`
        const body = headerConfigEdit.value
        const params = {}
        const headers = {}
        const { data } = await axios.put(
            url,
            body,
            {
                params,
                headers,
            },
        )
        headerConfigCurrent.value = data
        headerConfigCurrent.value = cloneDeep(headerConfigEdit.value)
    }

    async saveHeaderContent() {
        const url = `${this.adminUrl}/header-content`
        const body = headerContentEdit.value
        const params = {}
        const headers = {}
        const { data } = await axios.put(
            url,
            body,
            {
                params,
                headers,
            },
        )
        headerContentCurrent.value = data
        headerContentCurrent.value = cloneDeep(headerContentEdit.value)
    }

    async regenerateHeader() {
        if (this.isHeaderEdited) throw new Error("cannot generate header when it isn't saved")
        const url = `${this.adminUrl}/regenerate-header`
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

    get isHeaderContentEdited() {
        return JSON.stringify(headerContentCurrent.value) !== JSON.stringify(headerContentEdit.value)
    }
    get isHeaderConfigEdited() {
        return JSON.stringify(headerConfigCurrent.value) !== JSON.stringify(headerConfigEdit.value)
    }
    get isHeaderEdited() {
        return this.isHeaderContentEdited || this.isHeaderConfigEdited
    }

}
