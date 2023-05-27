import { NestableItem } from "../../classes/NestableItem";
import displayAreaView from "../../components/MainSidebar/func/displayAreaView";
import displayBlockView from "../../components/MainSidebar/func/displayBlockView";
import displayMainView from "../../components/MainSidebar/func/displayMainView";
import getIsAreaUUID from "../areaConfig/getIsAreaUUID";
import getIsBlockUUID from "../blockConfig/getIsBlockUUID";


const handleDisplayNestableItem = (item: NestableItem | null): void => {
    // main
    if (!item) {
        displayMainView()
        return
    }

    const isArea: boolean = getIsAreaUUID(item.id)
    const isBlock: boolean = getIsBlockUUID(item.id)

    if (isArea) { // area
        displayAreaView(item)
        return
    } else if (isBlock) { // block
        displayBlockView(item)
        return
    } else {
        throw new Error("could not find nestable id among areas or blocks")
    }
}


export default handleDisplayNestableItem