import resetPageContent from "../../logic/pageContent/resetPageContent"
import resetPageConfig from "../../logic/pageConfig/resetPageConfig"
import resetPageHTMLObject from "../../logic/pageHTMLObject/resetPageHTMLObject"
import setNestableConfigFromData from "../../logic/nestable/setNestableConfigFromData"

const handleReset = () => {
    resetPageConfig()
    resetPageContent()
    resetPageHTMLObject()
    setNestableConfigFromData()
}

export default handleReset