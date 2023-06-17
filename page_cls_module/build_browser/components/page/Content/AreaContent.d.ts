import { BlockContent, AreaContentMetadata } from "../../../";
export declare const buildAreaContent: (obj: any) => AreaContent;
export declare class AreaContent {
    uuid: string;
    data: {
        [configId: string]: (AreaContent | BlockContent);
    };
    metadata: AreaContentMetadata;
    clazz: string;
    constructor(uuid: string, data: {
        [configId: string]: (AreaContent | BlockContent);
    }, metadata: AreaContentMetadata);
}
//# sourceMappingURL=AreaContent.d.ts.map