import axios from "axios"
import { AdminService } from "./AdminService"
import getUUID from "@/utils/getUUID"
import { AssetRelEnum, LinkAsset, ScriptAsset } from "../../../../page_cls_module/build_browser"

export type S3Path = string
export type FileExtension = 'css' | 'js' | 'png'
export type TagType = "script" | "style" | "link"
export type Paths = {
    path: string,
    s3Path: string,
    s3Link: string
}
export class AssetService extends AdminService {
    bucketName: string
    pagePath: string
    constructor(adminUrl: string, bucketName: string, pagePath: string) {
        super(adminUrl)
        this.bucketName = bucketName
        this.pagePath = pagePath
    }

    public async uploadScript(file: File, pagePath: string): Promise<S3Path> {
        const url = `${this.adminUrl}/page-assets`
        const formData = new FormData();
        formData.append('file', file);
        formData.append('pagePath', pagePath);
        const { data } = await axios.post(url, formData)
        return data as S3Path
    }

    public async uploadStyle(file: File, pagePath: string): Promise<S3Path> {
        console.log(`file`, file)
        console.log(`pagePath`, pagePath)
        const url = `${this.adminUrl}/page-assets`
        const formData = new FormData();
        formData.append('file', file);
        formData.append('pagePath', pagePath);
        console.log(`formData`, formData)
        const { data } = await axios.post(url, formData)
        return data as S3Path
    }

    public async uploadLink(file: File, pagePath: string): Promise<S3Path> {
        const url = `${this.adminUrl}/page-assets`
        const formData = new FormData();
        formData.append('file', file);
        formData.append('pagePath', pagePath);
        const { data } = await axios.post(url, formData)
        return data as S3Path
    }

    public getNewJSAsset(): ScriptAsset {
        const fileUUID = getUUID()
        const fileExtension = "js"
        const { path, s3Path, s3Link } = this.getFilePaths(fileUUID, "script", fileExtension)
        const asset = new ScriptAsset(fileUUID, "Script Asset", false, false, path, s3Path, s3Link)
        return asset
    }

    public getNewLinkAsset(): LinkAsset {
        const fileUUID = getUUID()
        const fileExtension = "css"
        const href = ""
        const { path, s3Path, s3Link } = this.getFilePaths(fileUUID, "link", fileExtension)
        const asset = new LinkAsset(fileUUID, "Link Asset", href, path, s3Path, s3Link, AssetRelEnum.STYLESHEET)
        return asset
    }

    public getFilePaths(assetUUID: string, type: TagType, fileExtension: FileExtension, hash?: string): Paths {
        const path = this.generatePath(assetUUID, type, fileExtension, hash)
        const s3Path = this.generateS3Path(path, this.pagePath)
        const s3Link = this.generateS3Link(s3Path, this.bucketName)
        return {
            path,
            s3Path,
            s3Link
        }
    }

    private generatePath(fileUUID: string, type: TagType, fileExtension: FileExtension, hash = getUUID()): string {
        const path = `/static/assets/${type}/${fileUUID}-${hash}.${fileExtension}`;
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
