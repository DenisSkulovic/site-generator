import {S3Operations} from "@s3_module"
import { FooterContent, buildFooterContent } from "@page_cls_module"
import {type APIGatewayEvent} from "aws-lambda"

const handleFooterContentGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<FooterContent> => {
    const bucketName: string | undefined = process.env.BUCKET_NAME
    if (!bucketName) throw new Error("BUCKET_NAME is a mandatory env param")
    const s3 = new S3Operations(bucketName)
    const item = await s3.getJson("footer-content")
    return buildFooterContent(item)
}

export default handleFooterContentGet