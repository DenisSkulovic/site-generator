import { APIGatewayEvent } from "aws-lambda";
import { PageConfigRepository } from "@repository_module";
import { PageConfig, buildPageConfig } from "@page_cls_module";

const handlePageConfigPost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");

    const item: PageConfig = buildPageConfig(body);
    const repo = new PageConfigRepository();
    await repo.putItem(item);
}

export default handlePageConfigPost;
