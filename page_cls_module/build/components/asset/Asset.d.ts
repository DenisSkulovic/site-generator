import { AssetPositionEnum } from "./AssetPositionEnum";
import { AssetTagEnum } from "./AssetTagEnum";
export declare class Asset {
    uuid: string;
    name: string;
    path: string;
    s3Path: string;
    s3Link: string;
    tag: AssetTagEnum;
    position: AssetPositionEnum;
    clazz: string;
    constructor(uuid: string, name: string, path: string, s3Path: string, s3Link: string, position: AssetPositionEnum, tag: AssetTagEnum);
}
//# sourceMappingURL=Asset.d.ts.map