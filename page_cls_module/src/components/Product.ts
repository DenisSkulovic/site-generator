export const buildProduct = (obj: any): Product => {
    return new Product(obj.uuid)
}

export class Product {
    uuid: string
    constructor(uuid: string) {
        this.uuid = uuid
    }
}