export const buildMetadata = (obj) => {
    const metadata = new Metadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class Metadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=Metadata.js.map