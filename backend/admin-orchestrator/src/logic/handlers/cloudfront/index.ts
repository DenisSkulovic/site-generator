import { APIGatewayEvent } from "aws-lambda";
import { CloudFrontOperations } from "../../../../../cloudfront_module";
import getDistributionId from "./func/getDistributionId";

export const handleInvalidateByRegex = async (event: APIGatewayEvent, env: "dev" | "prod") => {
    const body = JSON.parse(event.body || "{}");
    const regex: string = body.regex;

    if (!regex || typeof regex !== "string") {
        throw new Error("Invalid request. 'regex' is a mandatory field in the body and it should be a string.");
    }

    const cloudfront = new CloudFrontOperations();
    const distributionId = getDistributionId(env);
    await cloudfront.createInvalidation(distributionId, [regex]);
}