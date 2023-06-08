import { APIGatewayEvent } from "aws-lambda";
import { PageGenerator } from "@/generator/PageGenerator";
import { GenerateHeaderResponse, buildGenerateHeaderRequest } from "@page_cls_module";

const handleGenerateHeader = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<GenerateHeaderResponse> => {
    const body = JSON.parse(event.body || "{}");

    const generateHeaderRequest = buildGenerateHeaderRequest(body);
    const generator = new PageGenerator(env);
    const header: GenerateHeaderResponse = await generator.generateHeader(generateHeaderRequest.content, generateHeaderRequest.config);
    return header;
}

export default handleGenerateHeader;
