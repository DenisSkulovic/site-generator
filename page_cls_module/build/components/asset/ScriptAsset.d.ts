import { Asset } from "./Asset";
import { AssetPositionEnum } from "./AssetPositionEnum";
import { AssetTypeEnum } from "./AssetTypeEnum";
export declare class ScriptAsset extends Asset {
    isAsync: boolean;
    isDefer: boolean;
    type: AssetTypeEnum;
    constructor(uuid: string, name: string, isAsync: boolean, isDefer: boolean, path: string, s3Path: string, s3Link: string, position?: AssetPositionEnum);
}
//# sourceMappingURL=ScriptAsset.d.ts.map