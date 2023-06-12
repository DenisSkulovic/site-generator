"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _repository_module_1 = require("@repository_module");
const __1 = require("../");
describe("handlePageConfigDelete", () => {
    // Test case 1
    it("should throw an error if key is not provided", async () => {
        try {
            await (0, __1.handlePageConfigDelete)({ pathParameters: undefined }, "dev");
        }
        catch (error) {
            expect(error.message).toBe("key is a mandatory path param");
        }
    });
    // Test case 2
    it("should delete an item from the repository", async () => {
        const repo = new _repository_module_1.PageConfigRepository();
        const mockDeleteItem = jest.spyOn(repo, "deleteItem");
        await (0, __1.handlePageConfigDelete)({ pathParameters: { key: "123" } }, "dev");
        expect(mockDeleteItem).toHaveBeenCalledWith("123");
    });
});
describe("handlePageConfigGet", () => {
    // Test case 1
    it("should throw an error if key is not provided", async () => {
        try {
            await (0, __1.handlePageConfigGet)({ pathParameters: undefined }, "dev");
        }
        catch (error) {
            expect(error.message).toBe("key is a mandatory path param");
        }
    });
    // Test case 2
    it("should get an item from the repository", async () => {
        const repo = new _repository_module_1.PageConfigRepository();
        const mockGetItem = jest.spyOn(repo, "getItem").mockResolvedValueOnce({ id: "123", name: "config" });
        const result = await (0, __1.handlePageConfigGet)({ pathParameters: { key: "123" } }, "dev");
        expect(result).toEqual({ id: "123", name: "config" });
        expect(mockGetItem).toHaveBeenCalledWith("123");
    });
});
describe("handlePageConfigPost", () => {
    // Test case 1
    it("should put an item in the repository", async () => {
        const body = { id: "123", name: "config" };
        const repo = new _repository_module_1.PageConfigRepository();
        const mockPutItem = jest.spyOn(repo, "putItem");
        await (0, __1.handlePageConfigPost)({ body: JSON.stringify(body) }, "dev");
        expect(mockPutItem).toHaveBeenCalledWith(body);
    });
});
describe("handlePageConfigPut", () => {
    // Test case 1
    it("should put an item in the repository", async () => {
        const body = { id: "123", name: "config" };
        const repo = new _repository_module_1.PageConfigRepository();
        const mockPutItem = jest.spyOn(repo, "putItem");
        await (0, __1.handlePageConfigPut)({ body: JSON.stringify(body) }, "dev");
        expect(mockPutItem).toHaveBeenCalledWith(body);
    });
});
//# sourceMappingURL=page-config.spec.js.map