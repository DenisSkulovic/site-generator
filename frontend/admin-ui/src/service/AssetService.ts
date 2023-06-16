import { AdminService } from "./AdminService"
import axios from "axios"

export class AssetService extends AdminService {

    constructor(adminUrl: string) {
        super(adminUrl)
    }

    async uploadAsset(assetPath: string, assetData: any): Promise<void> {
        const url = `${this.adminUrl}/page-assets`;
        await axios.put(url, assetData, {
            params: {
                path: assetPath,
            },
        });
    }

}