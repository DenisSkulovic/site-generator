import { Product, buildProduct } from "../../../page_cls_module/src"
import { Repository } from "./Repository"
import { TableEnum } from "./TableEnum"

export class ProductRepository extends Repository {
    constructor() {
        const tableName = TableEnum.PRODUCT
        const region = process.env.REGION
        if (!region) throw new Error("REGION is a mandatory env param")
        super(tableName, region)
    }
    public async getProductsAll(): Promise<Product[]> {
        const items = await this.getAllItems()
        return items.map((item)=>buildProduct(item))
    }

    public async getProduct(uuid: string): Promise<Product> {
        const item = await this.getItem({uuid: {S: uuid}})
        return buildProduct(item)
    }
    
    public async deleteProduct(uuid: string): Promise<void> {
        await this.deleteItem({uuid: {S: uuid}})
    }
    public async putProducts(items: Product[]) {
        await this.putItems(items)
    }
    public async putProduct(item: Product) {
        await this.putItem(item)
    }

}