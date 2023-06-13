import {currentNestableItem} from "../../../state/nestableState"
import setSidebarView from "./setSidebarView"
import ViewEnum from "../ViewEnum"


const displayMainView = () => {
    currentNestableItem.value = null
    setSidebarView(ViewEnum.MAIN)
}

export default displayMainView