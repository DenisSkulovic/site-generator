export declare class CloudFrontOperations {
    private cloudfront;
    constructor();
    createInvalidation(distributionId: string, paths: string[]): Promise<void>;
    listDistributions(): Promise<void>;
    getDistribution(distributionId: string): Promise<void>;
    listInvalidations(distributionId: string): Promise<void>;
    getInvalidation(distributionId: string, invalidationId: string): Promise<void>;
}
//# sourceMappingURL=CloudFrontOperations.d.ts.map