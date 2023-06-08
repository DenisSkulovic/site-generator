import { APIGatewayEvent } from "aws-lambda";
import { PageGenerator } from "@/generator/PageGenerator";
import { GeneratePageResponse, buildGeneratePageRequest } from "@page_cls_module";

const handleGeneratePage = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<GeneratePageResponse> => {
    const body = JSON.parse(event.body || "{}");

    const generatePageRequest = buildGeneratePageRequest(body);
    const generator = new PageGenerator(env);
    const page: GeneratePageResponse = await generator.generatePage(generatePageRequest.content, generatePageRequest.config);
    return page;
}

export default handleGeneratePage;
