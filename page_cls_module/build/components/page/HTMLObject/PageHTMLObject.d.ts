import { PageHTMLMetadata, PageConfig, PageContent } from "../../../";
export declare const buildPageHTMLObject: (obj: any) => PageHTMLObject;
export declare class PageHTMLObject {
    uuid: string;
    html: string;
    config: PageConfig;
    content: PageContent;
    metadata: PageHTMLMetadata;
    clazz: string;
    constructor(uuid: string, html: string, config: PageConfig, content: PageContent, metadata: PageHTMLMetadata);
}
//# sourceMappingURL=PageHTMLObject.d.ts.map