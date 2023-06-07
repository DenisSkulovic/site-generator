import {CloudFrontOperations} from "@cloudfront_module"
import getDistributionId from "./func/getDistributionId"
import {type APIGatewayEvent} from "aws-lambda"

const handleInvalidateAllCache = async (event: APIGatewayEvent, env: "dev" | "prod") => {
    const cloudfront = new CloudFrontOperations()
    const distributionId = getDistributionId(env)
    await cloudfront.createInvalidation(distributionId, ["/*"])
}

export default handleInvalidateAllCache