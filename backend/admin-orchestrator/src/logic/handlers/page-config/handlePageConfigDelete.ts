import { APIGatewayEvent } from "aws-lambda";
import { PageConfigRepository } from "@repository_module";

const handlePageConfigDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const key: string = event.pathParameters?.key;
    if (!key) {
        throw new Error("key is a mandatory path param");
    }

    const repo = new PageConfigRepository();
    await repo.deleteItem(key);
}

export default handlePageConfigDelete;
