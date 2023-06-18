export interface IAdminService {
    adminUrl: string
}

export class AdminService {
    adminUrl: string
    constructor(adminUrl: string) {
        this.adminUrl = adminUrl
    }
}