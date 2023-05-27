import { AreaConfigMetadata, AreaLayoutEnum, BlockConfig, BootstrapVersionEnum } from "../../../";
export declare const buildAreaConfig: (obj: any) => AreaConfig;
export declare class AreaConfig {
    uuid: string;
    areaName: string;
    isIncludeContainer: boolean;
    areaTemplateName: AreaLayoutEnum;
    bootstrapVersion: BootstrapVersionEnum;
    justify: string;
    align: string;
    childConfigArr: (AreaConfig | BlockConfig)[];
    metadata: AreaConfigMetadata;
    clazz: string;
    constructor(uuid: string, areaName: string, isIncludeContainer: boolean, areaTemplateName: AreaLayoutEnum, bootstrapVersion: BootstrapVersionEnum, justify: string, align: string, childConfigArr: (AreaConfig | BlockConfig)[], metadata: AreaConfigMetadata);
}
//# sourceMappingURL=AreaConfig.d.ts.map