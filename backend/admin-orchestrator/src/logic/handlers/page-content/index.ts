import { APIGatewayEvent } from "aws-lambda";
import { PageContentRepository } from "../../../../../repository_module";
import { PageContent, buildPageContent } from "../../../../../../page_cls_module";
import { Key } from "aws-sdk/clients/dynamodb";

export const handlePageContentDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const uuid: string | undefined = event.pathParameters?.uuid;
    if (!uuid) {
        throw new Error("uuid is a mandatory path param");
    }

    const repo = new PageContentRepository();
    await repo.deleteItem({uuid} as Key);
}

export const handlePageContentGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageContent> => {
    const uuid: string | undefined = event.pathParameters?.uuid;
    if (!uuid) {
        throw new Error("uuid is a mandatory path param");
    }

    const repo = new PageContentRepository();
    const data: any = await repo.getItem({uuid: uuid} as Key);
    return buildPageContent(data)
}

export const handlePageContentPost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageContent> => {
    const body = JSON.parse(event.body || "{}");
    
    const item: PageContent = buildPageContent(body);
    const uuid: string | undefined = body.uuid;

    const repo = new PageContentRepository();
    const existingItem: any = await repo.getItem({uuid: uuid} as Key);
    if (existingItem) throw new Error("page content with this uuid already exists: " + uuid)

    await repo.putItem(item);
    return item
}
