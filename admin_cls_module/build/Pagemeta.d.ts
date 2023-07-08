import { PagemetaMetadata } from "./PagemetaMetadata";
export declare const buildPagemeta: (obj: any) => Pagemeta;
export declare class Pagemeta {
    path: string;
    s3Path: string;
    s3Link: string;
    versionTag: string;
    isPublished: boolean;
    metadata: PagemetaMetadata;
    clazz: string;
    constructor(path: string, s3Path: string, s3Link: string, versionTag: string, isPublished: boolean, metadata: PagemetaMetadata);
}
//# sourceMappingURL=Pagemeta.d.ts.map