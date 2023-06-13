import { buildFooterContentMetadata } from "./FooterContentMetadata";
export const buildFooterContent = (obj) => {
    if (obj.clazz !== "FooterContent")
        throw new Error("clazz cannot be anything other than 'FooterContent'");
    const metadata = buildFooterContentMetadata(obj.metadata);
    const footerContent = new FooterContent(obj.uuid, obj.email, metadata);
    return footerContent;
};
export class FooterContent {
    constructor(uuid, email, metadata) {
        this.uuid = uuid;
        this.email = email;
        this.metadata = metadata;
        this.clazz = this.constructor.name;
    }
}
//# sourceMappingURL=FooterContent.js.map