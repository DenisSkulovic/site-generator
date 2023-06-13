import {currentPageContent, editPageContent} from "../../state/pageContentState"
import * as _ from "lodash"

const resetPageContent = () => {
    console.log(`resetPageContent`)
    editPageContent.value = _.cloneDeep(currentPageContent.value)
}

export default resetPageContent 