import type { NestableItem } from "../../../classes/NestableItem"
import currentNestableItem from "../../../state/nestable/currentNestableItem"
import getIsAreaUUID from "../../../logic/areaConfig/getIsAreaUUID"
import setSidebarView from "./setSidebarView"
import ViewEnum from "../ViewEnum"

const displayAreaView = (item: NestableItem) => {
    const isAreaUUID = getIsAreaUUID(item.id)
    if (!isAreaUUID) throw new Error("cannot display area view when the currentNestableItem is not an area")
    currentNestableItem.value = item
    setSidebarView(ViewEnum.AREA)
}

export default displayAreaView