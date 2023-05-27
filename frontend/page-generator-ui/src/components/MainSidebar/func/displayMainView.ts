import currentNestableItem from "../../../state/nestable/currentNestableItem"
import setSidebarView from "./setSidebarView"
import ViewEnum from "../ViewEnum"


const displayMainView = () => {
    currentNestableItem.value = null
    setSidebarView(ViewEnum.MAIN)
}

export default displayMainView