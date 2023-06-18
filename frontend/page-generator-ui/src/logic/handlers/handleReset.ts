import { pageContentService, pageConfigService, pageHTMLObjectService, nestableService } from "@/computed/services"

const handleReset = () => {
    pageConfigService.value.resetPageConfig()
    pageContentService.value.resetPageContent()
    pageHTMLObjectService.value.resetPageHTMLObject()
    nestableService.value.setNestableConfigFromData()
}

export default handleReset