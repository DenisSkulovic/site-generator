import { APIGatewayEvent } from "aws-lambda";
import { Product } from "../../../../../../page_cls_module/src";
import { ProductRepository } from "@repository_module";

const handleProductGetAll = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<Product[]> => {
    const repo = new ProductRepository();
    const products: Product[] = await repo.getAllItems();
    return products;
};

export default handleProductGetAll;
