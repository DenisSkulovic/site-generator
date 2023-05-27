import {reactive} from "vue"
import ViewEnum from "./ViewEnum"

const sidebarState: {
    currentView: ViewEnum,
} = reactive({
    currentView: ViewEnum.MAIN,
})

export default sidebarState