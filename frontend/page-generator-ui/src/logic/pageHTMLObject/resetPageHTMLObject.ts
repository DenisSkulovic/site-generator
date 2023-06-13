import {currentPageHTMLObject, editPageHTMLObject} from "../../state/pageHTMLObjectState"
import * as _ from "lodash"

const resetPageHTMLObject = (): void => {
    editPageHTMLObject.value = _.cloneDeep(currentPageHTMLObject.value)
}

export default resetPageHTMLObject