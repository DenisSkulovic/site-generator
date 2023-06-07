import type { NestableItem } from "../../../classes/NestableItem"
import currentNestableItem from "../../../state/nestable/currentNestableItem"
import getIsBlockUUID from "../../../logic/blockConfig/getIsBlockUUID"
import setSidebarView from "./setSidebarView"
import ViewEnum from "../ViewEnum"

const displayBlockView = (item: NestableItem) => {
    const isBlockUUID = getIsBlockUUID(item.id)
    if (!isBlockUUID) throw new Error("cannot display block view when the currentNestableItem is not a block")
    currentNestableItem.value = item
    setSidebarView(ViewEnum.BLOCK)
}

export default displayBlockView