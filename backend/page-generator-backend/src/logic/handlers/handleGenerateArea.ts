import constructArea from "../page-builder/page/constructArea"
import {AreaConfig, AreaContent, GenerateAreaRequest, GenerateAreaResponse, AreaHTMLObject} from "../../../../../page_cls_module"

const handleGenerateArea = async (
    requestData: GenerateAreaRequest,
): Promise<GenerateAreaResponse> => {
    console.log(`>>> handleGenerateArea`)

    const config: AreaConfig = requestData.config
    const content: AreaContent = requestData.content

    const areaHTMLObject: AreaHTMLObject = await constructArea(
        config,
        content,
    )

    const res: GenerateAreaResponse = new GenerateAreaResponse(
        areaHTMLObject
    )
    console.log(`handleGenerateArea res`, res)
    console.log(`<<< handleGenerateArea`)
    return res
}

export default handleGenerateArea