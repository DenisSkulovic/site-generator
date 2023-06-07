import type { PageConfig, PageContent, PageHTMLObject } from "../../../../page_cls_module/src";
import { AdminService } from "./AdminService";
import axios from "axios"

export class PageService extends AdminService {
    constructor(adminUrl: string) {
        super(adminUrl)
    }

    async fetchPageHTMLObject(uuid: string) : Promise<PageHTMLObject>{
        const url = `${this.adminUrl}/page-html/${uuid}`
        return await axios.get(url)
    }

    async fetchPageHTMLObjectAll(): Promise<PageHTMLObject[]> {
        const url = `${this.adminUrl}/page-html/all`
        return await axios.get(url)
    }

    private async savePageHTMLObject(pageHTMLObject: PageHTMLObject) {
        throw new Error("NOT IMPLEMENTED") // TODO
    }

    private async savePageOnS3(pageHTMLObject: PageHTMLObject) {
        throw new Error("NOT IMPLEMENTED") // TODO
    }

    async publishPage(pageHTMLObject: PageHTMLObject): Promise<void> {
        await Promise.all([
            this.savePageHTMLObject(pageHTMLObject),
            this.savePageOnS3(pageHTMLObject),
        ])
    }

    async unpublishPage(pageHTMLObject: PageHTMLObject): Promise<void> {
        await Promise.all([
            this.deletePageHTMLObject(pageHTMLObject),
            this.deletePageOnS3(pageHTMLObject),
        ])
    }

    async regeneratePage(pageHTMLObject: PageHTMLObject): Promise<void> {
        throw new Error("NOT IMPLEMENTED") // TODO
    }

    async regenerateAll(): Promise<void> {
        throw new Error("NOT IMPLEMENTED") // TODO
    }

    private async deletePageHTMLObject(pageHTMLObject: PageHTMLObject): Promise<void> {
        throw new Error("NOT IMPLEMENTED") // TODO
    }

    private async deletePageOnS3(pageHTMLObject: PageHTMLObject): Promise<void> {
        throw new Error("NOT IMPLEMENTED") // TODO
    }

} 