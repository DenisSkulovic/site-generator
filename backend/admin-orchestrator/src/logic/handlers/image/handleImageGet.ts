import {S3Operations} from "@s3_module"
import {type APIGatewayEvent} from "aws-lambda"

const handleImageGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<AWS.S3.GetObjectOutput> => {
    const key: string = event.pathParameters.key
    if (!key) throw new Error("key is a mandatory path param")
    const s3 = new S3Operations()
    const image = await s3.getImage(key)
    return image
}

export default handleImageGet