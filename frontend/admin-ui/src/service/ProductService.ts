import { productsEdit } from "@/state/products"
import { AdminService } from "./AdminService"
import { cloneDeep } from "lodash"
import { isProductsEdited } from "@/computed/product"
import axios from "axios"
import { productsCurrent } from "@/state/products"
import type { Product } from "@page_cls_module"
import { buildProduct } from "@page_cls_module"

export class ProductService extends AdminService {

    constructor(adminUrl: string) {
        super(adminUrl)
    }

    resetProduct(id: string) {
        throw new Error("NOT IMPLEMENTED") // TODO
    }
    resetProducts() {
        productsEdit.value = cloneDeep(productsCurrent.value);
    }

    async fetchProduct(uuid: string) : Promise<Product>{
        const url = `${this.adminUrl}/page-html/${uuid}`
        return await axios.get(url)
    }

    async fetchProductAll(): Promise<Product[]> {
        const url = `${this.adminUrl}/page-html/all`;
        const {data} = await axios.get(url);
        // Make sure data is an array before mapping over it
        if (!Array.isArray(data)) {
            throw new Error("Invalid data received from the server. Expected an array.");
        }
        // Build Product for each item in the array
        const pageHTMLObjects: Product[] = data.map(buildProduct);
        return pageHTMLObjects;
    }

    async getProductAll(): Promise<void> {
        productsCurrent.value = await this.fetchProductAll()
        productsEdit.value = cloneDeep(productsCurrent.value)
    }

    async saveProducts(updatedProducts: Product[]): Promise<void> {
        if (!isProductsEdited.value) throw new Error("cannot save products if they are not edited")
        if (!productsEdit.value) throw new Error("productsEdit.value cannot be undefined");
        const url = `${this.adminUrl}/product/all`
        await axios.put(url, updatedProducts)
    }
    
    setProducts(products: Product[]) {
        productsCurrent.value = products
        productsEdit.value = cloneDeep(productsCurrent.value);
    }

}