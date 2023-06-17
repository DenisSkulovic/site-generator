import axios from "axios"
import { AdminService } from "./AdminService"
import { editPageHTMLObject, currentPageHTMLObject } from "@/state/pageHTMLObjectState"
import _, { cloneDeep } from "lodash"
import type { PageHTMLObject } from "../../../../page_cls_module/build_browser"
import editedAreaConfigMap from "@/computed/pageConfig/editedAreaConfigMap"
import editedBlockConfigMap from "@/computed/pageConfig/editedBlockConfigMap"
import editedAreaContentMap from "@/computed/pageContent/editedAreaContentMap"
import editedBlockContentMap from "@/computed/pageContent/editedBlockContentMap"
import lastRenderedData from "@/state/lastRenderedData"
import { editPageConfig } from "@/state/pageConfigState"
import { editPageContent } from "@/state/pageContentState"

export type S3Path = string
export class PageHTMLObjectService extends AdminService {
    bucketName: string
    pagePath: string
    constructor(adminUrl: string, bucketName: string, pagePath: string) {
        super(adminUrl)
        this.bucketName = bucketName
        this.pagePath = pagePath
    }

    setPageHTMLObject(obj: PageHTMLObject) {
        currentPageHTMLObject.value = obj
        this.resetPageHTMLObject()
    }

    resetPageHTMLObject(): void {
        editPageHTMLObject.value = _.cloneDeep(currentPageHTMLObject.value)
    }

    renderPageHTMLObject() {
        if (!editPageHTMLObject.value) throw new Error("editPageHTMLObject.value cannot be undefined")
        const parsedDOM: Document = new DOMParser().parseFromString(editPageHTMLObject.value.html, "text/html")
        parsedDOM.body.innerHTML

        const contentDiv: HTMLElement | null = document.querySelector("#generated-content")
        if (!contentDiv) throw new Error("page must have a div with id 'generated-content'")

        contentDiv.innerHTML = parsedDOM.body.innerHTML

        this.setLastRenderedData()
    }

    setLastRenderedData() {
        console.log(`setLastRenderedData`)
        lastRenderedData.areaConfigMap = cloneDeep(editedAreaConfigMap.value)
        lastRenderedData.areaContentMap = cloneDeep(editedAreaContentMap.value)
        lastRenderedData.blockConfigMap = cloneDeep(editedBlockConfigMap.value)
        lastRenderedData.blockContentMap = cloneDeep(editedBlockContentMap.value)
        lastRenderedData.config = cloneDeep(editPageConfig.value)
        lastRenderedData.content = cloneDeep(editPageContent.value)
        lastRenderedData.htmlObject = cloneDeep(editPageHTMLObject.value)
    }
}


