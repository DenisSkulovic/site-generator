import { APIGatewayEvent } from "aws-lambda";
import { PageGenerator } from "@/generator/PageGenerator";
import { GenerateFooterResponse, buildGenerateFooterRequest } from "@page_cls_module";

const handleGenerateFooter = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<GenerateFooterResponse> => {
    const body = JSON.parse(event.body || "{}");

    const generateFooterRequest = buildGenerateFooterRequest(body);
    const generator = new PageGenerator(env);
    const footer: GenerateFooterResponse = await generator.generateFooter(generateFooterRequest.content, generateFooterRequest.config);
    return footer;
}

export default handleGenerateFooter;
