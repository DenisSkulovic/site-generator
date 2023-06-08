import { APIGatewayEvent } from "aws-lambda";
import { Product } from "../../../../../../page_cls_module/src";
import { ProductRepository } from "@repository_module";

const handleProductGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<Product | undefined> => {
    const uuid: string = event.pathParameters?.uuid;
    if (!uuid) throw new Error("uuid is a mandatory query string param");
    const repo = new ProductRepository();
    const product: Product | undefined = await repo.getItem(uuid);
    return product;
};

export default handleProductGet;
