import { headerConfigEdit, headerConfigCurrent, footerConfigEdit, footerConfigCurrent } from "@/state/configState"
import { headerContentCurrent, headerContentEdit, footerContentEdit, footerContentCurrent } from "@/state/contentState"
import { NavItem } from "@page_cls_module"
import {cloneDeep} from "lodash"
import { isHeaderEdited } from "@/computed/header"
import { FooterService } from "@/service/FooterService"
import { HeaderService } from "@/service/HeaderService"
import adminUrl from "@/state/adminUrl"

export const handleResetLinks = () => {
    const headerService = new HeaderService(adminUrl.value)
    headerService.resetLinks()
}

export const handleAddLink = (index?: number) => {
    const headerService = new HeaderService(adminUrl.value)
    headerService.addLink(index)
}

export const handleDeleteLink = (index: number) => {
    const headerService = new HeaderService(adminUrl.value)
    headerService.deleteLink(index)
}

export const handleResetHeader = () => {
    const headerService = new HeaderService(adminUrl.value)
    headerService.resetHeader()
}

export const handleResetFooter = () => {
    const footerService = new FooterService(adminUrl.value)
    footerService.resetFooter()
}

export const handleRegenerateHeader = async () => {
    const headerService = new HeaderService(adminUrl.value)
    return await headerService.regenerateHeader()
}

export const handleSaveFooter = async () => {
    const footerService = new FooterService(adminUrl.value)
    await Promise.all([
        footerService.saveFooterContent(),
        footerService.saveFooterConfig(),
    ])
}

export const handleRegenerateFooter = async () => {
    const footerService = new FooterService(adminUrl.value)
    return await footerService.regenetareFooter()
}

export const handleSaveHeader = async () => {
    const headerService = new HeaderService(adminUrl.value)
    await Promise.all([
        headerService.saveHeaderConfig(),
        headerService.saveHeaderContent(),
    ])
}