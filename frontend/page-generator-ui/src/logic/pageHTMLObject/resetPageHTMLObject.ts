import currentPageHTMLObject from "../../state/pageHTMLObject/currentPageHTMLObject"
import editPageHTMLObject from  "../../state/pageHTMLObject/editPageHTMLObject"
import * as _ from "lodash"

const resetPageHTMLObject = (): void => {
    editPageHTMLObject.value = _.cloneDeep(currentPageHTMLObject.value)
}

export default resetPageHTMLObject