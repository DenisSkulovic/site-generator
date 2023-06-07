import {S3Operations} from "@s3_module"
import {type APIGatewayEvent} from "aws-lambda"

const handleImageDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const key: string = event.pathParameters.key
    if (!key) throw new Error("key is a mandatory path param")
    const s3 = new S3Operations()
    await s3.deleteImage(key)
}

export default handleImageDelete