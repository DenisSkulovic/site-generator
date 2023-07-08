import { APIGatewayEvent } from "aws-lambda";
import { ProductRepository } from "../../../../../repository_module";
import { Product, buildProduct } from "../../../../../../page_cls_module";

export const handleProductDelete = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const uuid: string | undefined = event.pathParameters?.uuid;
    if (!uuid) throw new Error("uuid is a mandatory query string param");
    const repo = new ProductRepository();
    await repo.deleteProduct(uuid);
};

export const handleProductGet = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<Product | undefined> => {
    const uuid: string | undefined = event.pathParameters?.uuid;
    if (!uuid) throw new Error("uuid is a mandatory query string param");
    const repo = new ProductRepository();
    const product: Product | undefined = await repo.getProduct(uuid);
    return product;
};

export const handleProductGetAll = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<Product[]> => {
    const repo = new ProductRepository();
    const products: Product[] = await repo.getProductsAll();
    return products;
};

export const handleProductPost = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const item: Product = buildProduct(body);
    const repo = new ProductRepository();
    await repo.putProduct(item);
};

export const handleProductPut = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "{}");
    const item: Product = buildProduct(body);
    const repo = new ProductRepository();
    await repo.putProduct(item);
};

export const handleProductPutAll = async (event: APIGatewayEvent, env: "dev" | "prod"): Promise<void> => {
    const body = JSON.parse(event.body || "[]");
    const products: Product[] = body.map((productData: any) => buildProduct(productData));
    const repo = new ProductRepository();
    await repo.putProducts(products);
};
