import {S3Operations} from "@s3_module"
import { FooterConfig, buildFooterConfig } from "@page_cls_module"
import {type APIGatewayEvent} from "aws-lambda"

const handleFooterConfigGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<FooterConfig> => {
    const bucketName: string | undefined = process.env.BUCKET_NAME
    if (!bucketName) throw new Error("BUCKET_NAME is a mandatory env param")
    const s3 = new S3Operations(bucketName)
    const item = await s3.getJson("footer-config")
    return buildFooterConfig(item)
}

export default handleFooterConfigGet