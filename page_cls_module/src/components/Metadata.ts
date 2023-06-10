export const buildMetadata = (obj: any): Metadata => {
    const metadata = new Metadata(
        obj.createdTimestamp,
        obj.updatedTimestamp,
    )
    return metadata
}

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