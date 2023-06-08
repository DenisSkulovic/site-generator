import { APIGatewayEvent } from "aws-lambda";
import { PageConfigRepository } from "@repository_module";
import { PageConfig } from "@page_cls_module";

const handlePageConfigGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<PageConfig> => {
    const key: string = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }

    const repo = new PageConfigRepository();
    const item: PageConfig = await repo.getItem(key);
    return item;
}

export default handlePageConfigGet;
