import { siteConfigEdit, siteConfigCurrent } from "@/state/configState"
import s3 from "@/state/s3"
import { AdminService } from "./AdminService"
import {cloneDeep} from "lodash"
import {isProductsEdited} from "@/computed/product"

export class ProductService extends AdminService {

    constructor(adminUrl: string) {
        super(adminUrl)
    }

    resetProduct(id: string) {
        throw new Error("NOT IMPLEMENTER") // TODO
    }

    resetAll() {
        throw new Error("NOT IMPLEMENTER") // TODO
    }

    async fetchAll(force = false) {
        if (!force && siteConfigCurrent.value) return
        siteConfigCurrent.value = await s3.value.getJson("site-config")
    }

    async saveSiteConfig() {
        if (!siteConfigEdit.value) throw new Error("siteConfigEdit.value cannot be undefined")
        await s3.value.putJson("site-config", siteConfigEdit.value)
        siteConfigCurrent.value = cloneDeep(siteConfigEdit.value)
    }
    
}