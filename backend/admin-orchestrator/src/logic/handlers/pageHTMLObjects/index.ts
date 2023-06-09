import { APIGatewayEvent } from "aws-lambda";
import { PageHTMLRepository } from "@repository_module";
import { PageHTMLObject, buildPageHTMLObject } from "@page_cls_module";

export const handlePageHTMLObjectDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const key: string | undefined = event.pathParameters?.key;
    if (!key) throw new Error("key is a mandatory query string param");
    const repo = new PageHTMLRepository();
    await repo.deleteItem(key);
};

export const handlePageHTMLObjectGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageHTMLObject> => {
    const key: string | undefined = event.pathParameters?.key;
    if (!key) throw new Error("key is a mandatory query string param");
    const repo = new PageHTMLRepository();
    const item: PageHTMLObject = await repo.getItem(key);
    return item;
};

export const handlePageHTMLObjectGetAll = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageHTMLObject[]> => {
    const repo = new PageHTMLRepository();
    const items: PageHTMLObject[] = await repo.getAllItems();
    return items;
};

export const handlePageHTMLObjectPost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const pageHTMLObject: PageHTMLObject = buildPageHTMLObject(body);
    const key: string | undefined = event.queryStringParameters?.key;
    if (!key) throw new Error("key is a mandatory query string param");
    const repo = new PageHTMLRepository();
    await repo.putItem(key, pageHTMLObject);
};

export const handlePageHTMLObjectPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const pageHTMLObject: PageHTMLObject = buildPageHTMLObject(body);
    const key: string | undefined = event.queryStringParameters?.key;
    if (!key) throw new Error("key is a mandatory query string param");
    const repo = new PageHTMLRepository();
    await repo.putItem(key, pageHTMLObject);
};