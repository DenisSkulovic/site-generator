import axios from "axios";
import { CloudFrontService } from "../CloudFrontService";
import { AdminService } from "../AdminService";

// Mock admin URL
const adminUrl = "http://admin.example.com";

// Mock regular expression
const regex = "test-regex";

describe("CloudFrontService", () => {

    // Mock axios get method
    jest.spyOn(axios, "get").mockImplementation(() => {
        return Promise.resolve({ data: true });
    });

    // Create an instance of the service
    const service = new CloudFrontService(adminUrl);

    // Test constructor
    it("should inherit from AdminService", () => {
        expect(service instanceof AdminService).toBe(true);
    });

    // Test invalidateByRegex method
    it("should invalidate cloudfront cache by regex", async () => {
        const expectedResponse = true;
        const response = await service.invalidateByRegex(regex);
        expect(response).toEqual(expectedResponse);
        expect(axios.get).toHaveBeenCalledWith(`${adminUrl}/cloudfront/invalidate`, {
            params: { path: encodeURIComponent(regex) },
            headers: {}
        });
    });

    // Test error handling
    it("should throw an error if invalidateByRegex fails", async () => {
        const error = new Error("test-error");
        jest.spyOn(axios, "get").mockImplementation(() => {
            return Promise.reject(error);
        });
        await expect(service.invalidateByRegex(regex)).rejects.toThrow(error);
    });
});
