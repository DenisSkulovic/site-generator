import * as AWS from "aws-sdk";

export class CloudFrontOperations {
    private cloudfront: AWS.CloudFront;

    constructor() {
        const region = process.env.REGION
        if (!region) throw new Error("REGION is a mandatory env param")
        AWS.config.update({region});
        this.cloudfront = new AWS.CloudFront();
    }

    async createInvalidation(distributionId: string, paths: string[]): Promise<void> {
        const params: AWS.CloudFront.CreateInvalidationRequest = {
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
            if (!data.Invalidation) throw new Error("data.Invalidation cannot be undefined")
            console.log("Invalidation created:", JSON.stringify(data.Invalidation.Id));
        } catch (error) {
            console.error("Unable to create invalidation. Error:", JSON.stringify(error));
        }
    }

    async listDistributions(): Promise<void> {
        try {
            const data = await this.cloudfront.listDistributions({}).promise();
            if (!data.DistributionList) throw new Error("data.Invalidation cannot be undefined")
            console.log("Distributions:", JSON.stringify(data.DistributionList.Items));
        } catch (error) {
            console.error("Unable to list distributions. Error:", JSON.stringify(error));
        }
    }

    async getDistribution(distributionId: string): Promise<void> {
        const params: AWS.CloudFront.GetDistributionConfigRequest = {
            Id: distributionId
        };
        try {
            const data = await this.cloudfront.getDistributionConfig(params).promise();
            console.log("Distribution:", JSON.stringify(data));
        } catch (error) {
            console.error("Unable to get distribution. Error:", JSON.stringify(error));
        }
    }

    async listInvalidations(distributionId: string): Promise<void> {
        const params: AWS.CloudFront.ListInvalidationsRequest = {
            DistributionId: distributionId
        };
        try {
            const data = await this.cloudfront.listInvalidations(params).promise();
            if (!data.InvalidationList) throw new Error("data.Invalidation cannot be undefined")
            console.log("Invalidations:", JSON.stringify(data.InvalidationList.Items));
        } catch (error) {
            console.error("Unable to list invalidations. Error:", JSON.stringify(error));
        }
    }

    async getInvalidation(distributionId: string, invalidationId: string): Promise<void> {
        const params: AWS.CloudFront.GetInvalidationRequest = {
            DistributionId: distributionId,
            Id: invalidationId
        };
        try {
            const data = await this.cloudfront.getInvalidation(params).promise();
            console.log("Invalidation:", JSON.stringify(data.Invalidation));
        } catch (error) {
            console.error("Unable to get invalidation. Error:", JSON.stringify(error));
        }
    }
}