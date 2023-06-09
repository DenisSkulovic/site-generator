import { AreaConfig, AreaContent, AreaHTMLMetadata, AreaHTMLObject, AreaLayoutEnum, BlockConfig, BlockContent, BlockHTMLObject, BootstrapVersionEnum } from "@page_cls_module";
import ejs from "ejs";
import getDirName from "../../../utils/getDirName";
import guid from "../../../utils/guid";
import { RenderData_Area } from "../../../classes/renderData/areas/RenderData_Area";
import constructBlock from "./constructBlock";

export const constructChildHTMLObject = async (childConfig: AreaConfig | BlockConfig, areaContent: AreaContent, constructArea: ConstructAreaFn) => {
    if (childConfig instanceof AreaConfig) {
        const childAreaContent: AreaContent | undefined = areaContent.data[childConfig.uuid];
        if (!childAreaContent) throw new Error("childAreaContent cannot be undefined");
        if (!(childAreaContent instanceof AreaContent)) throw new Error("childAreaContent must be an instance of AreaContent");
        const areaHTMLObject: AreaHTMLObject = await constructArea(childConfig, childAreaContent);
        return areaHTMLObject;
    } else if (childConfig instanceof BlockConfig) {
        const childContent: BlockContent | undefined = areaContent.data[childConfig.uuid];
        if (!childContent) throw new Error("childContent cannot be undefined");
        if (!(childContent instanceof BlockContent)) throw new Error("childContent must be an instance of BlockContent");
        const blockHTMLObject: BlockHTMLObject = await constructBlock(childContent, childConfig);
        return blockHTMLObject;
    } else {
        throw new Error("can only handle AreaConfig and BlockConfig type objects");
    }
}

export const getClassString = (areaConfig: AreaConfig) => {
    const classes: string[] = [];
    if (areaConfig.justify) classes.push(areaConfig.justify);
    if (areaConfig.align) classes.push(areaConfig.align);
    if (areaConfig.isIncludeContainer) classes.push("container");
    return classes.join(" ");
}

export const getCols = (areaTemplateName: AreaLayoutEnum) => {
    return areaTemplateName ? areaTemplateName.split("_").map(_ => Number(_)) : [];
}
type ConstructAreaFn = (areaConfig: AreaConfig, areaContent: AreaContent) => Promise<AreaHTMLObject>

export const constructArea: ConstructAreaFn = async (areaConfig: AreaConfig, areaContent: AreaContent): Promise<AreaHTMLObject> => {
    const __dirname: string = getDirName();
    const bootstrapVersion: BootstrapVersionEnum = areaConfig.bootstrapVersion;
    const areaTemplateName: AreaLayoutEnum = areaConfig.areaTemplateName;
    const cols: number[] = getCols(areaTemplateName);

    const HTMLObjectPromiseArr: Promise<(AreaHTMLObject | BlockHTMLObject)>[] = areaConfig.childConfigArr.map(async (childConfig: AreaConfig | BlockConfig) => {
        return constructChildHTMLObject(childConfig, areaContent, constructArea);
    });
    const HTMLObjectArr: (AreaHTMLObject | BlockHTMLObject)[] = await Promise.all(HTMLObjectPromiseArr);
    const classString = getClassString(areaConfig);
    const areaRenderData: RenderData_Area = new RenderData_Area(areaConfig, areaContent, HTMLObjectArr, cols, classString);

    const uuid: string = guid();
    const createdTimestamp: number = Date.now();
    const updatedTimestamp = createdTimestamp;

    const areaTemplatePath = `${__dirname}/templates/html/${bootstrapVersion}/area/index.ejs`;

    const areaHtml: string = await ejs.renderFile(areaTemplatePath, areaRenderData);
    const areaMetadata: AreaHTMLMetadata = new AreaHTMLMetadata(createdTimestamp, updatedTimestamp);
    const areaHTMLObject: AreaHTMLObject = new AreaHTMLObject(uuid, areaHtml, areaConfig, areaContent, areaMetadata);
    return areaHTMLObject;
}

export default constructArea;
