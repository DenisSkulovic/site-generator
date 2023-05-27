import {reactive, ref} from "vue"
import type {NestableItem} from "../../classes/NestableItem"

const currentNestableItem: {value: NestableItem | null} = reactive({
    value: null
})

export default currentNestableItem