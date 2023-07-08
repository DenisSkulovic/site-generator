import { Product } from "../../../page_cls_module/src";
import { Repository } from "./Repository";
export declare class ProductRepository extends Repository {
    constructor();
    getProductsAll(): Promise<Product[]>;
    getProduct(uuid: string): Promise<Product>;
    deleteProduct(uuid: string): Promise<void>;
    putProducts(items: Product[]): Promise<void>;
    putProduct(item: Product): Promise<void>;
}
//# sourceMappingURL=ProductRepository.d.ts.map