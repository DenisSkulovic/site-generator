import axios from "axios"
import { AdminService } from "./AdminService"


export class CloudFrontService extends AdminService {

    constructor(adminUrl: string) {
        super(adminUrl)
    }

    async invalidateByRegex(regex: string) {
        const url = `${this.adminUrl}/cloudfront/invalidate`;
        const params = {
            path: encodeURIComponent(regex)
        }
        const headers = {

        }
        try {
            const response = await axios.get(url, {params, headers});
            return response.data;
        } catch (error) {
            console.error(`Error invalidating cache by regex: ${regex}`, error);
            throw error;
        }
    }

}