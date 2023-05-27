import currentPageContent from "../../state/pageContent/currentPageContent"
import editPageContent from "../../state/pageContent/editPageContent"
import * as _ from "lodash"

const resetPageContent = () => {
    console.log(`resetPageContent`)
    editPageContent.value = _.cloneDeep(currentPageContent.value)
}

export default resetPageContent 