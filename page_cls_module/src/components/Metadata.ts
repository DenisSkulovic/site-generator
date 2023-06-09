export class Metadata {
    createdTimestamp: number
    updatedTimestamp: number
    clazz: string
    constructor(
        createdTimestamp: number,
        updatedTimestamp: number,
    ) {
        this.createdTimestamp = createdTimestamp
        this.updatedTimestamp = updatedTimestamp
        this.clazz = this.constructor.name
    }
}