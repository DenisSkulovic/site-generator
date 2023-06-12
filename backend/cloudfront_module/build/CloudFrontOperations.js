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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudFrontOperations = void 0;
const AWS = __importStar(require("aws-sdk"));
class CloudFrontOperations {
    constructor() {
        const region = process.env.REGION;
        if (!region)
            throw new Error("REGION is a mandatory env param");
        AWS.config.update({ region });
        this.cloudfront = new AWS.CloudFront();
    }
    async createInvalidation(distributionId, paths) {
        const params = {
            DistributionId: distributionId,
            InvalidationBatch: {
                CallerReference: `${Date.now()}`,
                Paths: {
                    Quantity: paths.length,
                    Items: paths
                }
            }
        };
        try {
            const data = await this.cloudfront.createInvalidation(params).promise();
            if (!data.Invalidation)
                throw new Error("data.Invalidation cannot be undefined");
            console.log("Invalidation created:", JSON.stringify(data.Invalidation.Id));
        }
        catch (error) {
            console.error("Unable to create invalidation. Error:", JSON.stringify(error));
        }
    }
    async listDistributions() {
        try {
            const data = await this.cloudfront.listDistributions({}).promise();
            if (!data.DistributionList)
                throw new Error("data.Invalidation cannot be undefined");
            console.log("Distributions:", JSON.stringify(data.DistributionList.Items));
        }
        catch (error) {
            console.error("Unable to list distributions. Error:", JSON.stringify(error));
        }
    }
    async getDistribution(distributionId) {
        const params = {
            Id: distributionId
        };
        try {
            const data = await this.cloudfront.getDistributionConfig(params).promise();
            console.log("Distribution:", JSON.stringify(data));
        }
        catch (error) {
            console.error("Unable to get distribution. Error:", JSON.stringify(error));
        }
    }
    async listInvalidations(distributionId) {
        const params = {
            DistributionId: distributionId
        };
        try {
            const data = await this.cloudfront.listInvalidations(params).promise();
            if (!data.InvalidationList)
                throw new Error("data.Invalidation cannot be undefined");
            console.log("Invalidations:", JSON.stringify(data.InvalidationList.Items));
        }
        catch (error) {
            console.error("Unable to list invalidations. Error:", JSON.stringify(error));
        }
    }
    async getInvalidation(distributionId, invalidationId) {
        const params = {
            DistributionId: distributionId,
            Id: invalidationId
        };
        try {
            const data = await this.cloudfront.getInvalidation(params).promise();
            console.log("Invalidation:", JSON.stringify(data.Invalidation));
        }
        catch (error) {
            console.error("Unable to get invalidation. Error:", JSON.stringify(error));
        }
    }
}
exports.CloudFrontOperations = CloudFrontOperations;
//# sourceMappingURL=CloudFrontOperations.js.map