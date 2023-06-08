import {ref, type Ref} from "vue"
import getEnv from '../logic/getEnv';

const env: Ref<"dev" | "prod"> = ref(getEnv())

export default env