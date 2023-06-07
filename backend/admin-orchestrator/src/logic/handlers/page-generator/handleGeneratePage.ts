import {PageGenerator} from "@/generator/PageGenerator"
import { GeneratePageResponse, buildGeneratePageRequest } from "../../../../../../page_cls_module/src"
import {type APIGatewayEvent} from "aws-lambda"

const handleGeneratePage = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<GeneratePageResponse> => {
    const body = JSON.parse(event.body || "{}")
    const generatePageRequest = buildGeneratePageRequest(body)
    const generator = new PageGenerator(env)
    const Page: GeneratePageResponse = await generator.generatePage(generatePageRequest.content, generatePageRequest.config)
    return Page
}
export default handleGeneratePage