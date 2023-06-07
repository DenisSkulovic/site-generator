import { Product } from "../../../../../../page_cls_module/src";
import {ProductRepository} from "@repository_module"
import {type APIGatewayEvent} from "aws-lambda"

const handleProductGetAll = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<Product[]> => {
    const repo = new ProductRepository()
    const products: Product[] = await repo.getAllProducts()
    return products
}

export default handleProductGetAll