import setNestableConfigFromData from "../../logic/nestable/setNestableConfigFromData"
import { pageContentService, pageConfigService, pageHTMLObjectService } from "@/computed/services"

const handleReset = () => {
    pageConfigService.value.resetPageConfig()
    pageContentService.value.resetPageContent()
    pageHTMLObjectService.value.resetPageHTMLObject()
    setNestableConfigFromData()
}

export default handleReset