import {S3Operations} from "@s3_module"
import {type APIGatewayEvent} from "aws-lambda"

const handleImagePut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}")
    const key: string = body.key
    if (!key) throw new Error("key is a mandatory path param")
    const imageData: Buffer = body.imageData
    if (!imageData) throw new Error("imageData is a mandatory path param")
    const contentType: string = body.contentType
    if (!contentType) throw new Error("contentType is a mandatory path param")
    const s3 = new S3Operations()
    await s3.uploadImage(imageData, key, contentType)
}

export default handleImagePut