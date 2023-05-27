import * as DTO from "../../../../requests-module";

const buildValidateRequest = (body: {[key: string]: any}): DTO.FnacDartyValidateRequest => {
    if (!body.formData.lastname) throw new Error("lastname is a mandatory field in validate request body")
    if (!body.formData.firstname) throw new Error("firstname is a mandatory field in validate request body")
    if (!body.formData.last_six_digits) throw new Error("last_six_digits is a mandatory field in validate request body")
    if (!body.promocode) throw new Error("promocode is a mandatory field in validate request body")
    if (!body.promocodeProvider) throw new Error("promocodeProvider is a mandatory field in validate request body")
    const formData: DTO.FnacDartyFormData = new DTO.FnacDartyFormData(
        body.formData.lastname,
        body.formData.firstname,
        body.formData.last_six_digits,
    )
    return new DTO.FnacDartyValidateRequest(
        formData,
        body.promocode,
        body.promocodeProvider,
    )
}

export default buildValidateRequest