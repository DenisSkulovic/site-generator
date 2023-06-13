import sidebarState from "../sidebarState"
import ViewEnum from "../ViewEnum"
import {currentNestableItem} from "../../../state/nestableState"
import getIsAreaUUID from "../../../logic/areaConfig/getIsAreaUUID"
import getIsBlockUUID from "../../../logic/blockConfig/getIsBlockUUID"


const validateMainView = (): boolean => {
    if (currentNestableItem.value) throw new Error("when trying to display the main view, currentNestableItem has to be unset")
    return true
}
const validateAreaView = (): boolean => {
    const currentConfigId: string | undefined = currentNestableItem.value?.id
    if (!currentConfigId) throw new Error("cannot display area view when currentNestableItem is not set")
    const isAreaUUID = getIsAreaUUID(currentConfigId)
    if (!isAreaUUID) throw new Error("cannot display area view when the currentNestableItem is not an area")
    return true
}
const validateBlockView = (): boolean => {
    const currentConfigId: string | undefined = currentNestableItem.value?.id
    if (!currentConfigId) throw new Error("cannot display block view when currentNestableItem is not set")
    const isBlockUUID = getIsBlockUUID(currentConfigId)
    if (!isBlockUUID) throw new Error("cannot display block view when the currentNestableItem is not an block")
    return true
}

const setSidebarView = (newView: ViewEnum) => {
    if (newView === ViewEnum.MAIN) validateMainView()
    if (newView === ViewEnum.AREA) validateAreaView()
    if (newView === ViewEnum.BLOCK) validateBlockView()

    sidebarState.currentView = newView
}

export default setSidebarView