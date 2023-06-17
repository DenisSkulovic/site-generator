import { APIGatewayEvent } from "aws-lambda";
import { PageConfigRepository } from "../../../../../repository_module";
import { PageConfig, buildPageConfig } from "../../../../../../page_cls_module";
import { Key } from "aws-sdk/clients/dynamodb";

export const handlePageConfigDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const uuid: string | undefined = event.pathParameters?.uuid;
    if (!uuid) {
        throw new Error("uuid is a mandatory path param");
    }

    const repo = new PageConfigRepository();
    await repo.deleteItem({uuid} as Key);
}

export const handlePageConfigGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageConfig> => {
    const uuid: string | undefined = event.pathParameters?.uuid;
    if (!uuid) {
        throw new Error("uuid is a mandatory path param");
    }

    const repo = new PageConfigRepository();
    const data: any = await repo.getItem({uuid: uuid} as Key);
    return buildPageConfig(data)
}

export const handlePageConfigPost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageConfig> => {
    const body = JSON.parse(event.body || "{}");

    const item: PageConfig = buildPageConfig(body);
    const repo = new PageConfigRepository();
    await repo.putItem(item);
    return item
}

export const handlePageConfigPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageConfig> => {
    const body = JSON.parse(event.body || "{}");

    const item: PageConfig = buildPageConfig(body);
    const repo = new PageConfigRepository();
    await repo.putItem(item);
    return item
}