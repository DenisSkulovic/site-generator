import {ProductRepository} from "@repository_module"
import { Product, buildProduct } from "@page_cls_module"
import {type APIGatewayEvent} from "aws-lambda"

const handleProductPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}")
    const item: Product = buildProduct(body)
    const repo = new ProductRepository()
    await repo.putItem(item)
}

export default handleProductPut