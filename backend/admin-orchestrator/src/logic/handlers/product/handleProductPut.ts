import { APIGatewayEvent } from "aws-lambda";
import { Product, buildProduct } from "@page_cls_module";
import { ProductRepository } from "@repository_module";

const handleProductPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const item: Product = buildProduct(body);
    const repo = new ProductRepository();
    await repo.putItem(item);
};

export default handleProductPut;
