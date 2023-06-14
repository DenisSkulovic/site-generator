import { pagemetasCurrent, pagemetasEdit } from "@/state/pagemetas";
import { buildPagemeta, type Pagemeta } from "../../../../admin_cls_module";
import { AdminService } from "./AdminService";
import axios from "axios"
import { cloneDeep } from "lodash"
import type { PageHTMLObject } from "../../../../page_cls_module/src";

export class PagemetaService extends AdminService {
    constructor(adminUrl: string) {
        super(adminUrl)
    }

    async fetchPagemeta(uuid: string): Promise<Pagemeta> {
        const url = `${this.adminUrl}/page-html/${uuid}`
        return await axios.get(url)
    }

    async fetchPagemetaAll(): Promise<Pagemeta[]> {
        const url = `${this.adminUrl}/page-html/all`;
        const { data } = await axios.get(url);
        // Make sure data is an array before mapping over it
        if (!Array.isArray(data)) {
            throw new Error("Invalid data received from the server. Expected an array.");
        }
        // Build Pagemeta for each item in the array
        const pagemetas: Pagemeta[] = data.map(buildPagemeta);
        return pagemetas;
    }

    async getPagemetaAll(): Promise<void> {
        pagemetasCurrent.value = await this.fetchPagemetaAll()
        pagemetasEdit.value = cloneDeep(pagemetasCurrent.value)
    }

    async publishPage(pagemeta: Pagemeta): Promise<void> {
        const body = pagemeta
        const params = {

        }
        const headers = {

        }
        const url = `${this.adminUrl}/publish-page`
        const {data} = await axios.post(
            url,
            body,
            {
                params,
                headers,
            }
        )
        return data
    }

    async unpublishPage(pagemeta: Pagemeta): Promise<void> {
        const body = pagemeta
        const params = {
            
        }
        const headers = {

        }
        const url = `${this.adminUrl}/unpublish-page`
        const {data} = await axios.post(
            url,
            body,
            {
                params,
                headers,
            }
        )
        return data
    }

    async regenerateAll(): Promise<void> {
        const params = {

        }
        const headers = {

        }
        const url = `${this.adminUrl}/regenerate-all`
        const {data} = await axios.get(
            url,
            {
                params,
                headers,
            }
        )
        return data
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