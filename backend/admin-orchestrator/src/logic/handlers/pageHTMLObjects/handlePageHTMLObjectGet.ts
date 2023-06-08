import { APIGatewayEvent } from "aws-lambda";
import { PageHTMLRepository } from "@repository_module";
import { PageHTMLObject } from "@page_cls_module";

const handlePageHTMLObjectGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageHTMLObject> => {
    const key: string = event.pathParameters?.key;
    if (!key) throw new Error("key is a mandatory query string param");
    const repo = new PageHTMLRepository();
    const item: PageHTMLObject = await repo.getItem(key);
    return item;
};

export default handlePageHTMLObjectGet;
