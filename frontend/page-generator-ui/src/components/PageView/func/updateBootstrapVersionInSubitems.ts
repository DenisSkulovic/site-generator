import type { BootstrapVersionEnum, AreaConfig, BlockConfig } from '../../../../../../page_cls_module/build_browser';
import editedAreaConfigMap from "../../../computed/pageConfig/editedAreaConfigMap"
import editedBlockConfigMap from "../../../computed/pageConfig/editedBlockConfigMap"

const updateBootstrapVersionInSubitems = (newVal: BootstrapVersionEnum) => {
    const arr: (AreaConfig | BlockConfig)[] = [
        ...Object.values(editedAreaConfigMap.value),
        ...Object.values(editedBlockConfigMap.value),
    ]

    arr.forEach((confItem: AreaConfig | BlockConfig) => {
        confItem.bootstrapVersion = newVal
    })
}

export default updateBootstrapVersionInSubitems