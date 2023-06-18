import { Asset } from "./Asset";
import { AssetPositionEnum } from "./AssetPositionEnum";
import { AssetTypeEnum } from "./AssetTypeEnum";
export declare class StyleAsset extends Asset {
    type: AssetTypeEnum;
    content: string;
    constructor(uuid: string, name: string, content: string, path: string, s3Path: string, s3Link: string, position?: AssetPositionEnum);
}
//# sourceMappingURL=StyleAsset.d.ts.map