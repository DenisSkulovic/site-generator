import isJSONView from "../../state/isJSONView"

const handleToggleJSONView = () => {
    const contentDiv: HTMLElement | null = document.querySelector("#generated-content")
    if (!contentDiv) throw new Error("contentDiv cannot be undefined")

    isJSONView.value = !isJSONView.value

    if (isJSONView.value) {
        contentDiv.style.display = "none"
    } else {
        contentDiv.style.display = "block"
    }
}

export default handleToggleJSONView