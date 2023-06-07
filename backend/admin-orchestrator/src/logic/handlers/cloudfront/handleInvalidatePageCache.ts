import {CloudFrontOperations} from "@cloudfront_module"
import getDistributionId from "./func/getDistributionId"
import {type APIGatewayEvent} from "aws-lambda"

const handleInvalidatePageCache = async (event: APIGatewayEvent, env: "dev" | "prod") => {
    const body = JSON.parse(event.body || "{}")
    const paths: string[] = body.paths
    const cloudfront = new CloudFrontOperations()
    const distributionId = getDistributionId(env)
    await cloudfront.createInvalidation(distributionId, paths)
}

export default handleInvalidatePageCache