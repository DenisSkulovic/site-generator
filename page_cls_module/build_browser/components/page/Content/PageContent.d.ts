import { AreaContent } from "./AreaContent";
import { PageContentMetadata } from "./PageContentMetadata";
export declare const buildPageContent: (obj: any) => PageContent;
export declare class PageContent {
    uuid: string;
    data: {
        [areaConfigId: string]: AreaContent;
    };
    metadata: PageContentMetadata;
    clazz: string;
    constructor(uuid: string, data: {
        [areaConfigId: string]: AreaContent;
    }, metadata: PageContentMetadata);
}
//# sourceMappingURL=PageContent.d.ts.map