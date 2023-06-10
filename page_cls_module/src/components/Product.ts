export const buildProduct = (obj: any): Product => {
    return new Product(obj.uuid)
}

export class Product {
    uuid: string
    clazz: string
    constructor(uuid: string) {
        this.uuid = uuid
        this.clazz = this.constructor.name
    }
}