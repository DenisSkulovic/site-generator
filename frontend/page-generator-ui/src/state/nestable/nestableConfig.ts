import { reactive } from "vue"
import { NestableConfig } from "../../classes/NestableConfig"

const nestableConfig: {
    config: NestableConfig,
    toDelete: NestableConfig,
} = reactive({
    config: new NestableConfig(),
    toDelete: new NestableConfig(),
})

export default nestableConfig