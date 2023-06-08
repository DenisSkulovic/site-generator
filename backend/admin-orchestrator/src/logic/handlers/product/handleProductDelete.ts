import { APIGatewayEvent } from "aws-lambda";
import { ProductRepository } from "@repository_module";

const handleProductDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const uuid: string = event.pathParameters?.uuid;
    if (!uuid) throw new Error("uuid is a mandatory query string param");
    const repo = new ProductRepository();
    await repo.deleteItem(uuid);
};

export default handleProductDelete;
