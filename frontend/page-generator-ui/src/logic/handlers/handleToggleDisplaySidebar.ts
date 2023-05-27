import isDisplaySidebar from "@/state/isDisplaySidebar"

const handleToggleDisplaySidebar = () => {
    isDisplaySidebar.value = !isDisplaySidebar.value
}

export default handleToggleDisplaySidebar