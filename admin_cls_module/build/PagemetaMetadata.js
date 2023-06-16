export const buildPagemetaMetadata = (obj) => {
    const metadata = new PagemetaMetadata(obj.createdTimestamp, obj.updatedTimestamp);
    return metadata;
};
export class PagemetaMetadata {
    constructor(createdTimestamp, updatedTimestamp) {
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=PagemetaMetadata.js.map