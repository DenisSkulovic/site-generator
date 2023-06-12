import { Asset } from "./Asset";
import { AssetRelEnum } from "./AssetRelEnum";
import { AssetPositionEnum } from "./AssetPositionEnum";
export declare class LinkAsset extends Asset {
    rel: AssetRelEnum;
    constructor(uuid: string, name: string, path: string, s3Path: string, s3Link: string, rel: AssetRelEnum, position?: AssetPositionEnum);
}
//# sourceMappingURL=LinkAsset.d.ts.map