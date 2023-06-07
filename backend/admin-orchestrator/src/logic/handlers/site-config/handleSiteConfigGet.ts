import {S3Operations} from "@s3_module"
import { SiteConfig, buildSiteConfig } from "@admin_cls_module"
import {type APIGatewayEvent} from "aws-lambda"

const handleSiteConfigGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<SiteConfig> => {
    const bucketName: string | undefined = process.env.BUCKET_NAME
    if (!bucketName) throw new Error("BUCKET_NAME is a mandatory env param")
    const s3 = new S3Operations(bucketName)
    const item = await s3.getJson("site-config")
    return buildSiteConfig(item)
}

export default handleSiteConfigGet