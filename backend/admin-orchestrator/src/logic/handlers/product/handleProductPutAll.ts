import { APIGatewayEvent } from "aws-lambda";
import { Product, buildProduct } from "@page_cls_module";
import { ProductRepository } from "@repository_module";

const handleProductPutAll = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "[]");
    const products: Product[] = body.map((productData: any) => buildProduct(productData));
    const repo = new ProductRepository();
    await repo.putItems(products);
};

export default handleProductPutAll;