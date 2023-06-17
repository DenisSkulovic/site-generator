import { BlockContentMetadata } from "./BlockContentMetadata";
export declare const buildBlockContent: (obj: any) => BlockContent;
export declare class BlockContent {
    uuid: string;
    data: {
        [key: string]: any;
    };
    metadata: BlockContentMetadata;
    clazz: string;
    constructor(uuid: string, data: {
        [key: string]: any;
    }, metadata: BlockContentMetadata);
}
//# sourceMappingURL=BlockContent.d.ts.map