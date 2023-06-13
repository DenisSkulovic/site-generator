import { APIGatewayEvent } from "aws-lambda";
import { PageConfigRepository } from "../../../../../repository_module";
import { PageConfig, buildPageConfig } from "../../../../../../page_cls_module";

export const handlePageConfigDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const key: string | undefined = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }

    const repo = new PageConfigRepository();
    await repo.deleteItem(key);
}

export const handlePageConfigGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageConfig> => {
    const key: string | undefined = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }

    const repo = new PageConfigRepository();
    const data: any = await repo.getItem(key);
    const objectData = data.Body.toString('utf-8');
    const jsonData = JSON.parse(objectData); 
    return buildPageConfig(jsonData)
}

export const handlePageConfigPost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");

    const item: PageConfig = buildPageConfig(body);
    const repo = new PageConfigRepository();
    await repo.putItem(item);
}

export const handlePageConfigPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");

    const item: PageConfig = buildPageConfig(body);
    const repo = new PageConfigRepository();
    await repo.putItem(item);
}