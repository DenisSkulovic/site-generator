import CheckBoxField from "../components/fields/CheckBoxField.vue"
import SelectInputField from "../components/fields/SelectInputField.vue"
import TextAreaField from "../components/fields/TextAreaField.vue"
import TextInputField from "../components/fields/TextInputField.vue"

enum FieldsEnum {
    CHECKBOX = CheckBoxField,
    SELECT = SelectInputField,
    TEXT = TextInputField,
    TEXTAREA = TextAreaField,
}

export default FieldsEnum