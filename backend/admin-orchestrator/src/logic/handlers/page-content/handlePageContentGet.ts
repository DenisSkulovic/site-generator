import { APIGatewayEvent } from "aws-lambda";
import { PageContentRepository } from "@repository_module";
import { PageContent } from "@page_cls_module";

const handlePageContentGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageContent> => {
    const key: string = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }

    const repo = new PageContentRepository();
    const item: PageContent = await repo.getItem(key);
    return item;
}

export default handlePageContentGet;
