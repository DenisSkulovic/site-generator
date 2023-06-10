import { pagesCurrent, pagesEdit } from "@/state/pages";
import { buildPageHTMLObject, type PageHTMLObject } from "../../../../page_cls_module/src";
import { AdminService } from "./AdminService";
import axios from "axios"
import { cloneDeep } from "lodash"

export class PageService extends AdminService {
    constructor(adminUrl: string) {
        super(adminUrl)
    }

    async fetchPageHTMLObject(uuid: string): Promise<PageHTMLObject> {
        const url = `${this.adminUrl}/page-html/${uuid}`
        return await axios.get(url)
    }

    async fetchPageHTMLObjectAll(): Promise<PageHTMLObject[]> {
        const url = `${this.adminUrl}/page-html/all`;
        const { data } = await axios.get(url);
        // Make sure data is an array before mapping over it
        if (!Array.isArray(data)) {
            throw new Error("Invalid data received from the server. Expected an array.");
        }
        // Build PageHTMLObject for each item in the array
        const pageHTMLObjects: PageHTMLObject[] = data.map(buildPageHTMLObject);
        return pageHTMLObjects;
    }

    async getPageHTMLObjectAll(): Promise<void> {
        pagesCurrent.value = await this.fetchPageHTMLObjectAll()
        pagesEdit.value = cloneDeep(pagesCurrent.value)
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

    async uploadAsset(assetPath: string, assetData: any): Promise<AxiosResponse> {
        const url = `${this.adminUrl}/page-assets`;
        return await axios.put(url, assetData, {
            params: {
                path: assetPath,
            },
        });
    }

    async downloadAsset(assetPath: string): Promise<AxiosResponse> {
        const url = `${this.adminUrl}/page-assets`;
        return await axios.get(url, {
            params: {
                path: assetPath,
            },
            responseType: 'blob', // Important: axios should handle the response as a Blob
        });
    }

} 