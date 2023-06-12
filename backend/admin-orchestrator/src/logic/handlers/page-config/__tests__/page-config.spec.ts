// @ts-nocheck
import { APIGatewayEvent } from "aws-lambda";
import { PageConfigRepository } from "@repository_module";
import { handlePageConfigDelete, handlePageConfigGet, handlePageConfigPost, handlePageConfigPut } from "../";

describe("handlePageConfigDelete", () => {
    // Test case 1
    it("should throw an error if key is not provided", async () => {
        try {
            await handlePageConfigDelete({ pathParameters: undefined } as unknown as APIGatewayEvent, "dev");
        } catch (error: any) {
            expect(error.message).toBe("key is a mandatory path param");
        }
    });

    // Test case 2
    it("should delete an item from the repository", async () => {
        const repo = new PageConfigRepository();
        const mockDeleteItem = jest.spyOn(repo, "deleteItem");
        await handlePageConfigDelete({ pathParameters: { key: "123" } } as unknown as APIGatewayEvent, "dev");
        expect(mockDeleteItem).toHaveBeenCalledWith("123");
    });
});

describe("handlePageConfigGet", () => {
    // Test case 1
    it("should throw an error if key is not provided", async () => {
        try {
            await handlePageConfigGet({ pathParameters: undefined } as unknown as APIGatewayEvent, "dev");
        } catch (error: any) {
            expect(error.message).toBe("key is a mandatory path param");
        }
    });

    // Test case 2
    it("should get an item from the repository", async () => {
        const repo = new PageConfigRepository();
        const mockGetItem = jest.spyOn(repo, "getItem").mockResolvedValueOnce({ id: "123", name: "config" });
        const result = await handlePageConfigGet({ pathParameters: { key: "123" } } as unknown as APIGatewayEvent, "dev");
        expect(result).toEqual({ id: "123", name: "config" });
        expect(mockGetItem).toHaveBeenCalledWith("123");
    });
});

describe("handlePageConfigPost", () => {
    // Test case 1
    it("should put an item in the repository", async () => {
        const body = { id: "123", name: "config" };
        const repo = new PageConfigRepository();
        const mockPutItem = jest.spyOn(repo, "putItem");
        await handlePageConfigPost({ body: JSON.stringify(body) } as unknown as APIGatewayEvent, "dev");
        expect(mockPutItem).toHaveBeenCalledWith(body);
    });
});

describe("handlePageConfigPut", () => {
    // Test case 1
    it("should put an item in the repository", async () => {
        const body = { id: "123", name: "config" };
        const repo = new PageConfigRepository();
        const mockPutItem = jest.spyOn(repo, "putItem");
        await handlePageConfigPut({ body: JSON.stringify(body) } as unknown as APIGatewayEvent, "dev");
        expect(mockPutItem).toHaveBeenCalledWith(body);
    });
});
