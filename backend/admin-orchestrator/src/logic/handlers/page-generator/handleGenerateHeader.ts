import { PageGenerator } from "@/generator/PageGenerator"
import { GenerateHeaderResponse, buildGenerateHeaderRequest } from "../../../../../../page_cls_module/src"
import { type APIGatewayEvent } from "aws-lambda"

const handleGenerateHeader = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<GenerateHeaderResponse> => {
    const body = JSON.parse(event.body || "{}")
    const generateHeaderRequest = buildGenerateHeaderRequest(body)
    const generator = new PageGenerator(env)
    const Header: GenerateHeaderResponse = await generator.generateHeader(generateHeaderRequest.content, generateHeaderRequest.config)
    return Header
}
export default handleGenerateHeader