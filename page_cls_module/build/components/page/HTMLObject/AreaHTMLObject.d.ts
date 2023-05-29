import { AreaConfig, AreaContent, AreaHTMLMetadata } from "../../../";
export declare const buildAreaHTMLObject: (obj: any) => AreaHTMLObject;
export declare class AreaHTMLObject {
    uuid: string;
    html: string;
    config: AreaConfig;
    content: AreaContent;
    metadata: AreaHTMLMetadata;
    clazz: string;
    constructor(uuid: string, html: string, config: AreaConfig, content: AreaContent, metadata: AreaHTMLMetadata);
}
//# sourceMappingURL=AreaHTMLObject.d.ts.map