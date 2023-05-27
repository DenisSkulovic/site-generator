import * as DTO from "../../../../../requests-module";
import callFnacDarty from "../../api/callFnacDarty"


const handleValidate = async (validateRequest: DTO.FnacDartyValidateRequest): Promise<{ isValid: boolean }> => {
    const isValid: boolean = await callFnacDarty(validateRequest.formData)
    return { isValid }
}

export default handleValidate