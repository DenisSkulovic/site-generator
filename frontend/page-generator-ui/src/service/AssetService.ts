import axios from "axios"
import { AdminService } from "./AdminService"
import getUUID from "@/utils/getUUID"
import { ScriptAsset, StyleAsset } from "../../../../page_cls_module/src"

export type S3Path = string
export class AssetService extends AdminService {
    bucketName: string
    pagePath: string
    constructor(adminUrl: string, bucketName: string, pagePath: string) {
        super(adminUrl)
        this.bucketName = bucketName
        this.pagePath = pagePath
    }

    async uploadScript(file: File, pagePath: string): Promise<S3Path> {
        const url = `${this.adminUrl}/page-assets`
        const formData = new FormData();
        formData.append('file', file);
        formData.append('pagePath', pagePath);
        const { data } = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data as S3Path
    }

    async uploadStyle(file: File, pagePath: string): Promise<S3Path> {
        const url = `${this.adminUrl}/page-assets`
        const formData = new FormData();
        formData.append('file', file);
        formData.append('pagePath', pagePath);
        const { data } = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data as S3Path
    }

    async uploadLink(file: File, pagePath: string): Promise<S3Path> {
        const url = `${this.adminUrl}/page-assets`
        const formData = new FormData();
        formData.append('file', file);
        formData.append('pagePath', pagePath);
        const { data } = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data as S3Path
    }

    getNewJSAsset(): ScriptAsset {
        const fileUUID = getUUID()
        const fileExtension = "js"
        const path = this.generatePath(fileUUID, "script", fileExtension)
        const S3Path = this.generateS3Link(path, this.pagePath)
        const S3Link = this.generateS3Link(S3Path, this.bucketName)
        const asset = new ScriptAsset(fileUUID, "Script Asset", false, false, path, S3Path, S3Link) // change this to add default asset of your choice
        return asset
    }
    getNewCSSAsset(): StyleAsset {
        const fileUUID = getUUID()
        const fileExtension = "css"
        const path = this.generatePath(fileUUID, "style", fileExtension)
        const S3Path = this.generateS3Path(path, this.pagePath)
        const S3Link = this.generateS3Link(S3Path, this.bucketName)
        const asset = new StyleAsset(fileUUID, "Style Asset", path, S3Path, S3Link) // change this to add default asset of your choice
        return asset
    }

    private generatePath(fileUUID: string, type: "script" | "style", fileExtension: 'css' | 'js' | 'png'): string {
        const path = `/static/assets/${type}/${fileUUID}.${fileExtension}`;
        return path;
    }
    private generateS3Path(path: string, pagePath: string): string {
        const s3Link = `${pagePath}${path}`;
        return s3Link;
    }
    private generateS3Link(S3path: string, bucketName: string): string {
        const s3Link = `https://${bucketName}.s3.amazonaws.com/${S3path}`;
        return s3Link;
    }
}
