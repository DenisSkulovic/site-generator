import { headerConfigEdit, headerConfigCurrent } from "@/state/configState"
import s3 from "@/state/s3"
import { AdminService } from "./AdminService"
import { cloneDeep } from "lodash"
import { headerContentEdit, headerContentCurrent } from "@/state/contentState"
import { NavItem } from "@page_cls_module"

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
        headerConfigCurrent.value = await s3.value.getJson("header-config")
    }

    async fetchHeaderContent(force = false) {
        if (!force && headerContentCurrent.value) return
        headerContentCurrent.value = await s3.value.getJson("header-content")
    }

    async saveHeaderConfig() {
        await s3.value.putJson("header-config", headerConfigEdit.value)
        headerConfigCurrent.value = cloneDeep(headerConfigEdit.value)
    }

    async saveHeaderContent() {
        await s3.value.putJson("header-content", headerContentEdit.value)
        headerContentCurrent.value = cloneDeep(headerContentEdit.value)
    }

    async regenerateHeader() {
        if (this.isHeaderEdited) throw new Error("cannot generate header when it isn't saved")
        throw new Error("NOT IMPLEMENTER") // TODO
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
