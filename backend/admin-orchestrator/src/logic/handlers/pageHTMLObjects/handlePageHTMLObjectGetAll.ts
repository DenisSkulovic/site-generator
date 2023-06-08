import { APIGatewayEvent } from "aws-lambda";
import { PageHTMLRepository } from "@repository_module";
import { PageHTMLObject } from "@page_cls_module";

const handlePageHTMLObjectGetAll = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageHTMLObject[]> => {
    const repo = new PageHTMLRepository();
    const items: PageHTMLObject[] = await repo.getAllItems();
    return items;
};

export default handlePageHTMLObjectGetAll;
