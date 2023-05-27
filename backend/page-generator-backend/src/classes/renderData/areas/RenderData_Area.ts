import * as _ from "lodash"
import {AreaConfig, AreaContent, AreaHTMLObject, BlockHTMLObject} from "../../../../../../page_cls_module"

export class RenderData_Area {
    config: AreaConfig
    content: AreaContent
    protected HTMLObjectArr: Array<(AreaHTMLObject | BlockHTMLObject)>
    cols: number[]
    classString?: string
    clazz: string
    constructor(
        config: AreaConfig,
        content: AreaContent,
        HTMLObjectArr: Array<(AreaHTMLObject | BlockHTMLObject)>,
        cols: number[],
        classString?: string,
    ) {
        this.config = config
        this.content = content
        this.HTMLObjectArr = HTMLObjectArr
        this.cols = cols
        this.classString = classString
        this.clazz = this.constructor.name
    }

    public getHTMLObjectArr(): Array<(AreaHTMLObject | BlockHTMLObject)> {
        return _.cloneDeep(this.HTMLObjectArr)
    }
}