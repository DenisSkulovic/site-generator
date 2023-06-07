import { S3Operations } from "@s3_module"
import {type APIGatewayEvent} from "aws-lambda"

const handlePageDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const url: string = event.queryStringParams.url
    if (!url) throw new Error("url is a mandatory query string param")
    const bucketName: string | undefined = process.env.BUCKET_NAME
    if (!bucketName) throw new Error("BUCKET_NAME is a mandatory env param")
    const s3 = new S3Operations(bucketName)
    await s3.deletePage(url)
}

export default handlePageDelete