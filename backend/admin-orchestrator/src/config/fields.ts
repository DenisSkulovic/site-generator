import * as DTO from "../../../../requests-module"

const nom = new DTO.PromocodeConfigField(
    "lastname",
    "text",
    'promocode_last_name',
    "^[a-zA-ZÀ-ÿ-. ]+$",
    "promocode_invalid_format",
)
const prenom = new DTO.PromocodeConfigField(
    "firstname",
    "text",
    'promocode_first_name',
    "^[a-zA-ZÀ-ÿ-. ]+$",
    "promocode_invalid_format",
)
const last_6_digits = new DTO.PromocodeConfigField(
    "last_six_digits",
    "number",
    'promocode_last_6_digits',
    '^[0-9]{6}$',
    "promocode_invalid_format",
)

const fields: DTO.PromocodeConfigField[] = [
    nom,
    prenom,
    last_6_digits,
]

export default fields