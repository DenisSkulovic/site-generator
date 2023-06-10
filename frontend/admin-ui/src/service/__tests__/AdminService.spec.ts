import { AdminService } from '../AdminService'

describe('AdminService', () => {
    it('should initialize adminUrl correctly', () => {
        const adminUrl = 'http://localhost:3000/admin'
        const service = new AdminService(adminUrl)

        expect(service.adminUrl).toEqual(adminUrl)
    })
})