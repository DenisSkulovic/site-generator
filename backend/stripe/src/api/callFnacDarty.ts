import defaultHeaders from "../config/headers"
import axios from "axios"
import * as DTO from "../../../../requests-module/build"
import {fnacDartyUrl} from "../config/url"

const callFnacDarty = async (
    formData: DTO.FnacDartyFormData,
): Promise<boolean> => {
    try {
        const fnacDartyKey = process.env.FNAC_DARTY_KEY
        if (!fnacDartyKey) throw new Error("FNAC_DARTY_KEY is a mandatory env variable")
        const params = {
            lastname: formData.lastname,
            firstname: formData.firstname,
            cardNumber: formData.last_six_digits,
        }
        const headers = {
            ...defaultHeaders,
            "x-api-key": fnacDartyKey
        }
        const response = await axios.get(fnacDartyUrl, {
            params,
            headers,
        })
        if (response.data.member == 1) return true
        return false
    } catch (err) {
        console.error(err)
        throw err
    }
}

export default callFnacDarty