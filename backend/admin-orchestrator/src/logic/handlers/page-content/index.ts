import { APIGatewayEvent } from "aws-lambda";
import { PageContentRepository } from "../../../../../repository_module";
import { PageContent, buildPageContent } from "../../../../../../page_cls_module";

export const handlePageContentDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const key: string | undefined = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }

    const repo = new PageContentRepository();
    await repo.deleteItem(key);
}

export const handlePageContentGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageContent> => {
    const key: string | undefined = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }

    const repo = new PageContentRepository();
    const data: any = await repo.getItem(key);
    const objectData = data.Body.toString('utf-8');
    const jsonData = JSON.parse(objectData); 
    return buildPageContent(jsonData)
}

export const handlePageContentPost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");

    const item: PageContent = buildPageContent(body);
    const repo = new PageContentRepository();
    await repo.putItem(item);
}

export const handlePageContentPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");

    const item: PageContent = buildPageContent(body);
    const repo = new PageContentRepository();
    await repo.putItem(item);
} 