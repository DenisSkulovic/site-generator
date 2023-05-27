import type { PageHTMLObject } from "../../../../../page_cls_module/src"
import setLastRenderedData from "./setLastRenderedData"

const renderPageHTMLObject = (pageHTMLObject: PageHTMLObject) => {
    const parsedDOM: Document = new DOMParser().parseFromString(pageHTMLObject.html, "text/html")
    parsedDOM.body.innerHTML

    const contentDiv: HTMLElement | null = document.querySelector("#generated-content")
    if (!contentDiv) throw new Error("page must have a div with id 'generated-content'")

    contentDiv.innerHTML = parsedDOM.body.innerHTML

    setLastRenderedData()
}

export default renderPageHTMLObject