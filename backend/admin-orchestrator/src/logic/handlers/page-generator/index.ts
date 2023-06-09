import { APIGatewayEvent } from "aws-lambda";
import { PageGenerator } from "@/generator/PageGenerator";
import { GenerateFooterResponse, GenerateHeaderResponse, GeneratePageResponse, buildGenerateFooterRequest, buildGenerateHeaderRequest, buildGeneratePageRequest } from "@page_cls_module";

export const handleGenerateFooter = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<GenerateFooterResponse> => {
    const body = JSON.parse(event.body || "{}");

    const generateFooterRequest = buildGenerateFooterRequest(body);
    const generator = new PageGenerator(env);
    const footer: GenerateFooterResponse = await generator.generateFooter(generateFooterRequest.content, generateFooterRequest.config);
    return footer;
}

export const handleGenerateHeader = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<GenerateHeaderResponse> => {
    const body = JSON.parse(event.body || "{}");

    const generateHeaderRequest = buildGenerateHeaderRequest(body);
    const generator = new PageGenerator(env);
    const header: GenerateHeaderResponse = await generator.generateHeader(generateHeaderRequest.content, generateHeaderRequest.config);
    return header;
}

export const handleGeneratePage = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<GeneratePageResponse> => {
    const body = JSON.parse(event.body || "{}");

    const generatePageRequest = buildGeneratePageRequest(body);
    const generator = new PageGenerator(env);
    const page: GeneratePageResponse = await generator.generatePage(generatePageRequest.content, generatePageRequest.config);
    return page;
}