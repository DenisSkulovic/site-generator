import {S3Operations} from "@s3_module"
import { FooterConfig, buildFooterConfig } from "@page_cls_module"
import {type APIGatewayEvent} from "aws-lambda"

const handleFooterConfigPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}")
    const item: FooterConfig = buildFooterConfig(body)
    const bucketName: string | undefined = process.env.BUCKET_NAME
    if (!bucketName) throw new Error("BUCKET_NAME is a mandatory env param")
    const s3 = new S3Operations(bucketName)
    await s3.putJson("footer-config", item)
}

export default handleFooterConfigPut