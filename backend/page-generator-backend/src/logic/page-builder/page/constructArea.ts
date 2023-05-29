import * as DTO from "@page_cls_module"
import ejs from "ejs"
import getDirName from "../../../utils/getDirName"
import guid from "../../../utils/guid"
import { RenderData_Area } from "../../../classes/renderData/areas/RenderData_Area"
import constructBlock from "./constructBlock"

/**
 * This function should not generate anything, and instead, it should only combine received html and create a page. Other functions are responsible for generation of HTML
 */
const constructArea = async (
    areaConfig: DTO.AreaConfig,
    areaContent: DTO.AreaContent,
): Promise<DTO.AreaHTMLObject> => {
    const __dirname: string = getDirName()
    const bootstrapVersion: DTO.BootstrapVersionEnum = areaConfig.bootstrapVersion
    const areaTemplateName: DTO.AreaLayoutEnum = areaConfig.areaTemplateName
    const cols: number[] = areaTemplateName ? areaTemplateName.split("_").map(_=>Number(_)) : []

    const HTMLObjectPromiseArr: Promise<(DTO.AreaHTMLObject | DTO.BlockHTMLObject)>[] = areaConfig.childConfigArr.map(async (childConfig: DTO.AreaConfig | DTO.BlockConfig) => {
        if (childConfig instanceof DTO.AreaConfig) {
            const childAreaContent: DTO.AreaContent | undefined = areaContent.data[childConfig.uuid]
            if (!childAreaContent) throw new Error("childAreaContent cannot be undefined")
            if (!(childAreaContent instanceof DTO.AreaContent)) throw new Error("childAreaContent must be an instance of AreaContent")
            const areaHTMLObject: DTO.AreaHTMLObject = await constructArea(
                childConfig,
                childAreaContent,
            )
            return areaHTMLObject
        } else if (childConfig instanceof DTO.BlockConfig) {
            const childContent: DTO.BlockContent | undefined = areaContent.data[childConfig.uuid]
            if (!childContent) throw new Error("childContent cannot be undefined")
            if (!(childContent instanceof DTO.BlockContent)) throw new Error("childContent must be an instance of BlockContent")
            const blockHTMLObject: DTO.BlockHTMLObject = await constructBlock(
                childContent,
                childConfig,
            )
            return blockHTMLObject
        } else {
            throw new Error("can only handle AreaConfig and BlockCOnfig type objects")
        }
    })
    const HTMLObjectArr: (DTO.AreaHTMLObject | DTO.BlockHTMLObject)[] = await Promise.all(HTMLObjectPromiseArr)
    const classes: string[] = []
    if (areaConfig.justify) classes.push(areaConfig.justify)
    if (areaConfig.align) classes.push(areaConfig.align)
    if (areaConfig.isIncludeContainer) classes.push("container")
    const classString = classes.join(" ")
    const areaRenderData: RenderData_Area = new RenderData_Area(
        areaConfig,
        areaContent,
        HTMLObjectArr,
        cols,
        classString,
    )

    const uuid: string = guid()
    const createdTimestamp: number = Date.now()
    const updatedTimestamp = createdTimestamp

    const areaTemplatePath = `${__dirname}/templates/html/${bootstrapVersion}/area/index.ejs`

    const areaHtml: string = await ejs.renderFile(areaTemplatePath, areaRenderData)
    const areaMetadata: DTO.AreaHTMLMetadata = new DTO.AreaHTMLMetadata(
        createdTimestamp,
        updatedTimestamp,
    )
    const areaHTMLObject: DTO.AreaHTMLObject = new DTO.AreaHTMLObject(
        uuid,
        areaHtml,
        areaConfig,
        areaContent,
        areaMetadata,
    )
    return areaHTMLObject
}

export default constructArea