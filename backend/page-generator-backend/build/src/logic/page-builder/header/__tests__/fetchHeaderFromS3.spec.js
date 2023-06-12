"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const AWS = __importStar(require("aws-sdk"));
const mockFactories_1 = require("../../../../../../../page_cls_module/src/mockFactories");
const fetchHeaderFromS3_1 = __importDefault(require("../fetchHeaderFromS3"));
const _page_cls_module_1 = require("@page_cls_module");
jest.mock('aws-sdk', () => {
    return {
        S3: jest.fn().mockImplementation(() => {
            return {
                getObject: jest.fn().mockImplementation(() => {
                    return {
                        promise: jest.fn(),
                    };
                }),
            };
        }),
    };
});
describe("fetchHeaderFromS3", () => {
    beforeEach(() => {
        process.env.BUCKET_NAME = "test-bucket";
        process.env.HEADER_KEY_S3 = "test-header-key";
        const s3 = new AWS.S3();
        s3.getObject().promise.mockResolvedValue({ Body: JSON.stringify((0, mockFactories_1.createHeaderHTMLObject)({})) });
    });
    test("Should return a HeaderHTMLObject instance", async () => {
        const header = await (0, fetchHeaderFromS3_1.default)();
        expect(header).toBeDefined();
        expect(header).toBeInstanceOf(_page_cls_module_1.HeaderHTMLObject);
    });
    test("Should throw an error when environment variables are not set", async () => {
        delete process.env.BUCKET_NAME;
        delete process.env.HEADER_KEY_S3;
        await expect((0, fetchHeaderFromS3_1.default)()).rejects.toThrow();
    });
});
//# sourceMappingURL=fetchHeaderFromS3.spec.js.map